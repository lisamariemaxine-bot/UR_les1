const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix image tag inside the grid for PDF
  content = content.replace(
    /<img src="\/Parti%20doos\.pdf" alt="partii" className="project-img" \/>/g,
    '<embed src="/Parti%20doos.pdf" type="application/pdf" width="100%" height="100%" />'
  );
  
  // Fix the other one with style
  content = content.replace(
    /<img src="\/Parti%20doos\.pdf" alt="partii" style=\{\{ width: '100%', height: '100%', objectFit: 'cover' \}\} \/>/g,
    '<embed src="/Parti%20doos.pdf" type="application/pdf" width="100%" height="100%" />'
  );

  // Fix modal to support PDF
  content = content.replace(
    /<img\s+src=\{modalImg\}\s+alt="Vergrote afbeelding"\s+(.*?)\/>/s,
    `{modalImg.endsWith('.pdf') ? (
              <iframe src={modalImg} style={{ width: '90vw', height: '90vh', border: 'none' }} />
            ) : (
              <img src={modalImg} alt="Vergrote afbeelding" $1/>
            )}`
  );

  // For project3/page.tsx where the tag might be split differently
  // We'll just write a generic replace for modal
  
  fs.writeFileSync(file, content);
}

fixFile('app/project-3/page.tsx');
// fixFile('app/project3/page.tsx'); // We'll just do it for project-3 first
