// Copies a signed release APK into public/downloads and writes the manifest the
// download modal reads. Usage:
//   npm run publish-apk <path/to/app-release.apk> [version] [min-android]
// Positional on purpose: PowerShell drops npm's `--` separator, so `--version`
// would be swallowed by npm itself. Without a version, the versionName is read
// from Flutter's output-metadata.json.
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const [apkPath, versionArg, minAndroidArg] = process.argv.slice(2);

if (!apkPath || !existsSync(apkPath) || !apkPath.endsWith('.apk')) {
  console.error('Pass the path to a built .apk, e.g. npm run publish-apk ../bananaCheck/app/build/app/outputs/flutter-apk/app-release.apk');
  process.exit(1);
}

if (/debug/i.test(basename(apkPath))) {
  console.error('Refusing to publish a debug build. Run `flutter build apk --release` first.');
  process.exit(1);
}

if (minAndroidArg && !/^\d+(\.\d+)?$/.test(minAndroidArg)) {
  console.error('min-android should look like 5.0');
  process.exit(1);
}

function versionFromMetadata() {
  const candidates = [
    join(dirname(apkPath), 'output-metadata.json'),
    resolve(dirname(apkPath), '..', 'apk', 'release', 'output-metadata.json')
  ];
  for (const file of candidates) {
    if (!existsSync(file)) continue;
    const meta = JSON.parse(readFileSync(file, 'utf8'));
    const name = meta.elements?.[0]?.versionName;
    if (name) return name;
  }
  return undefined;
}

const version = versionArg ?? versionFromMetadata();
if (!version || !/^\d+\.\d+\.\d+([.+-][\w.]+)?$/.test(version)) {
  console.error('Could not determine the version. Pass it after the path: npm run publish-apk <apk> 1.0.0');
  process.exit(1);
}

const minAndroid = minAndroidArg ?? '5.0';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'downloads');
const file = `Bananalyze-v${version}.apk`;

mkdirSync(outDir, { recursive: true });
for (const old of readdirSync(outDir)) {
  if (old.endsWith('.apk') && old !== file) rmSync(join(outDir, old));
}

const bytes = statSync(apkPath).size;
const sha256 = createHash('sha256').update(readFileSync(apkPath)).digest('hex');
copyFileSync(apkPath, join(outDir, file));
writeFileSync(join(outDir, 'latest.json'), `${JSON.stringify({ version, file, bytes, sha256, minAndroid }, null, 2)}\n`);

console.log(`Published ${file} (${(bytes / 1048576).toFixed(1)} MB)`);
console.log(`sha256 ${sha256}`);
if (bytes > 90 * 1048576) {
  console.warn('Warning: over 90 MB. GitHub rejects files above 100 MB; consider `flutter build apk --release --split-per-abi`.');
}
