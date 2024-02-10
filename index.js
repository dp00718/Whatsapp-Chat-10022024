function zipFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length === 0) {
      alert('Please select at least one file.');
      return;
    }
  
    const zip = new JSZip();
    const zipFilename = 'compressed_files.zip';
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      zip.file(file.name, file);
    }
  
    zip.generateAsync({ type: 'blob' })
      .then(function (content) {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(content);
        downloadLink.download = zipFilename;
        downloadLink.click();
      });
  }
  
  function extractFiles() {
    const zipInput = document.getElementById('zipInput');
    const file = zipInput.files[0];
    if (!file) {
      alert('Please select a zip file.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const zip = new JSZip();
      zip.loadAsync(e.target.result)
        .then(function (zip) {
          // Display or manipulate the files in the zip
          console.log(zip.files);
        });
    };
    reader.readAsArrayBuffer(file);
  }