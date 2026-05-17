const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(
    /<img src="\/Parti%20doos\.pdf" alt="partii" style=\{\{ width: '100%', height: '100%', objectFit: 'cover' \}\} \/>/g,
    '<embed src="/Parti%20doos.pdf" type="application/pdf" width="100%" height="100%" />'
  );

  content = content.replace(
    /<img\s+src=\{modalImg\}\s+alt="Vergrote afbeelding"\s+(.*?)\/>/s,
    `{modalImg.endsWith('.pdf') ? (
              <iframe src={modalImg} style={{ width: '90vw', height: '90vh', border: 'none', borderRadius: 12 }} />
            ) : (
              <img src={modalImg} alt="Vergrote afbeelding" $1/>
            )}`
  );
  
  fs.writeFileSync(file, content);
}

fixFile('app/project3/page.tsx');
