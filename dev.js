
const chokidar = require('chokidar');
const { spawn } = require('child_process');

// Configuration
const entryScript = './src/index.ts';
const watchDir = 'src';
let bunProcess = null;

// Starts or restarts the Bun process
function startBun() {
  if (bunProcess) {
    bunProcess.kill();
    bunProcess = null;
  }
  console.clear();
  console.log('Starting Bun...');
  bunProcess = spawn('bun', ['run', entryScript], { stdio: 'inherit' });
}

// Clean up on exit
function shutdown() {
  if (bunProcess) bunProcess.kill();
  process.exit();
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Initial run
startBun();

// Watch for changes under `src` and restart Bun on any change
const watcher = chokidar.watch(watchDir, { ignoreInitial: true });
watcher.on('all', (event, filePath) => {
  console.log(`\n🔄 File changed: ${filePath} (${event}). Re-running Bun...`);
  startBun();
});
