const fs = require('fs');
const path = require('path');

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => {
        const res = path.join(dir, d.name);
        return d.isDirectory() ? walk(res) : res;
    });
}

const publicFiles = walk('public').map(p => path.relative('public', p));
const codeFiles = walk('app').filter(f => /\.(tsx|jsx|ts|js)$/.test(f));
const refs = new Set();
const re = /["'`]\/([^"'`]+\.(?:png|jpg|jpeg|gif|svg|PNG|JPG|JPEG|GIF|SVG))/g;

codeFiles.forEach(f => {
    const s = fs.readFileSync(f, 'utf8');
    let m;
    while ((m = re.exec(s)) !== null) {
        refs.add(m[1]);
    }
});

const scriptLines = ['#!/bin/bash', 'set -e'];
let opsCount = 0;

Array.from(refs).forEach(ref => {
    const clean = ref.replace(/%20/g, ' ').replace(/\s+/g, ' ').trim();
    const norm = clean.replace(/\s+/g, '-').toLowerCase();
    
    let match = publicFiles.find(p => 
        p.toLowerCase() === ref.toLowerCase() || 
        p.toLowerCase() === clean.toLowerCase() || 
        p.toLowerCase() === norm.toLowerCase() ||
        p.toLowerCase() === ref.replace(/%20/g, '').toLowerCase()
    );

    if (match) {
        const fromPath = path.join('public', match);
        const toPath = path.join('public', norm);
        
        if (match !== norm) {
            scriptLines.push(`echo "Moving ${fromPath} to ${toPath}"`);
            scriptLines.push(`git mv "${fromPath}" "${toPath}" || mv "${fromPath}" "${toPath}"`);
        }
        
        // Escape characters for sed
        const escapedRef = ref.replace(/[/]/g, '\\/').replace(/[.&*^$]/g, '\\$&');
        const newRef = '\\/' + norm; 
        
        codeFiles.forEach(f => {
            // Check if file contains the ref before adding sed command
            const content = fs.readFileSync(f, 'utf8');
            if (content.includes(ref)) {
              scriptLines.push(`sed -i '' 's/${escapedRef}/${newRef}/g' "${f}"`);
            }
        });
        opsCount++;
    } else {
        scriptLines.push(`echo "# MISSING: ${ref} (no match in public)"`);
    }
});

if (opsCount > 0) {
    fs.writeFileSync('update-images.sh', scriptLines.join('\n'));
    fs.chmodSync('update-images.sh', 0o755);
    console.log(`Wrote update-images.sh with ${opsCount} ops`);
} else {
    console.log('No operations to perform');
}
