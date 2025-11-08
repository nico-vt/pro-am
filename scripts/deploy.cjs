const { execSync } = require('child_process');

function exec(cmd, options = {}) {
  console.log(`> ${cmd}`);
  try {
    return execSync(cmd, { 
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: 'utf8',
      ...options 
    });
  } catch (error) {
    if (options.ignoreError) {
      return null;
    }
    throw error;
  }
}

console.log('🚀 Iniciando proceso de deployment...\n');

// 1. Build del proyecto
console.log('📦 Step 1: Build del proyecto');
exec('npm run build');

console.log('✅ Build completado\n');

// 2. Agregar dist temporalmente (force porque está en .gitignore)
console.log('📍 Step 2: Agregando dist temporalmente');
exec('git add dist -f');

let needsReset = false;
try {
  exec('git commit -m "temp: dist for deploy"');
  needsReset = true;
  console.log('✅ Commit temporal creado\n');
} catch (e) {
  console.log('ℹ️  No hay cambios en dist\n');
}

// 3. Limpiar rama deploy local
console.log('🗑️  Step 3: Limpiando rama deploy local');
exec('git branch -D deploy', { ignoreError: true });
console.log('✅ Rama local limpiada\n');

// 4. Crear subtree (esto crea una rama con SOLO el contenido de dist/)
console.log('🌳 Step 4: Creando rama deploy desde dist/');
console.log('   Nota: git subtree split crea commits con el contenido de dist/\n');
exec('git subtree split --prefix dist -b deploy');
console.log('✅ Rama deploy creada\n');

// 5. Push forzado (sin pull automático)
console.log('🚀 Step 5: Subiendo a GitHub');
exec('git push origin deploy --force --no-verify');
console.log('✅ Deploy completado en rama remota\n');

// 6. Limpiar commit temporal si se creó
if (needsReset) {
  console.log('🧹 Step 6: Limpiando commit temporal');
  exec('git reset HEAD~1');
  console.log('✅ Commit temporal removido\n');
}

console.log('🎉 ¡DEPLOYMENT EXITOSO!');
console.log('\n📝 Verifica en GitHub:');
console.log('   https://github.com/TU_USUARIO/TU_REPO/tree/deploy');
console.log('\n   Deberías ver en la raíz:');
console.log('   ├── assets/');
console.log('   ├── favicon.png');
console.log('   └── index.html');