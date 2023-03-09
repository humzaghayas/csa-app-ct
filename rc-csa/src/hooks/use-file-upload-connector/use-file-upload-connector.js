import {ref, getDownloadURL, uploadBytesResumable,deleteObject ,storage,getForKey} from 'ct-tickets-helper-api'

export const useFileUploadService = () => {
  

  const execute =(formik,file,files,setFiles,setProgresspercent,setFileDeleteName,setFileDeleteUrl,setImgUploaded) =>{

    const folder = getForKey(formik.values.email);
    
    const storageRef = ref(storage, `files/${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          formik.values.files = formik.values.files.concat([{name:file.name,url:downloadURL}]);
          setFiles(files.concat(
            <div key={file.name} id={`id-${file.name}`}>
              <input type="radio" value={downloadURL} onClick={()=>{setFileDeleteName(file.name);setFileDeleteUrl(downloadURL);}} name="fileDeleteRadio" />&nbsp;&nbsp;<a  href={downloadURL}>{file.name}</a><br/>
            </div>));
          // files.push({name:file.name,url:downloadURL});
          setImgUploaded(true);
          console.log('concat',formik.values.files);
          console.log('downloadURL',downloadURL);
        });
      });
    };

  return {
    execute
  };
};

export const useFileDeleteService= () =>{

  const deleteFileHandle =(formik,fileDeleteUrl,fileDeleteName) =>{
      const desertRef = ref(storage, fileDeleteUrl);

      let f = [];
      f =f.concat(formik?.values?.files);

      const index = f.findIndex(f => f.name ===fileDeleteName);

      f.splice(index, 1);
      document.getElementById(`id-${fileDeleteName}`).remove();

      formik.values.files = f;

       deleteObject(desertRef).then(function() {
        console.log('File Deleted');
      }).catch(function(error) {
        console.error('error',error);
      });
  }

  return {
    deleteFileHandle
  }
}