
var pdf=require('pdfkit');
var fs=require('fs');
let peo=[


    {name:'iii'}
];
let i=1000;
peo.forEach((p)=>{

i++;
let doc=new pdf();
doc.pipe(fs.createWriteStream(`pdffc\${i}-${p.name}.pdf`));

doc.text(`id: ${i}\nname :${p.name}`,100,100);
doc.end();




}
)
