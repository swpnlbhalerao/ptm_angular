import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileTriggerService } from './FileTriggerService';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit,OnDestroy {

  /*  uploader:FileUploader = new FileUploader({url:uri});
  
    attachmentList:any = []; */
  selectedFiles :File[]=[];
  disableCancel:boolean=false;
  selectedfile: File;
  uploadResponse = { status: '', message: '', filePath: '', uploadProgress: '' };
  error: string;
  disableBtns: boolean = false;
  resetBtn :boolean =false;
  private subscriptions: Subscription = new Subscription();

  constructor(private fileService: FileTriggerService) {


  }

  ngOnInit() {

  }

  onSubmit(triggerEmailForm: NgForm) {
    this.disableCancel=true;
    this.disableBtns = true;
    this.error = ''
    let formData = new FormData();
   // formData.append('file', this.selectedfile, this.selectedfile.name);
   
   this.selectedFiles.forEach((file)=>{
    formData.append("files",file,file.name)
   })
   //formData.append('files', this.selectedFiles);
    formData.append('subject', triggerEmailForm.value.subject)
    formData.append('emailBody', triggerEmailForm.value.emailBody)
    console.log(formData);

    this.subscriptions.add(this.fileService.submitData(formData).subscribe(
      (res) => {
        console.log(res);
        this.uploadResponse = res
      },
      (err) => this.error = err
    ));
  }
  removeUploadFile(index:number,triggerForm:NgForm){
     this.selectedFiles.splice(index,1);
      if(this.selectedFiles.length==0){
          triggerForm.controls['fileUpload'].reset();
      }else if(this.selectedFiles.length==1){
        /* triggerForm.controls['subject'].setValue(this.selectedFiles[0].name); */
        //triggerForm.controls['fileUpload'].setValue(this.selectedFiles[0].name)
        
      }

  }


  onFileChange(event) {
      this.selectedFiles=[];
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFiles.push(event.target.files[i]);
 } 



  }


  download() {
    this.error = ''
    console.log("dwonlaod call")
    this.resetBtn=true;

    this.subscriptions.add(this.fileService.downloadFile()
      .subscribe(
        data => saveAs(data),
        error => this.error = error
      ));
  }

  resetForm(triggerEmailForm: NgForm) {
    this.resetMessage();
    this.resetUploadResponse();

    triggerEmailForm.resetForm();
  }


  resetMessage(){
    this.error=''
    this.selectedFiles=[];
  }

  resetUploadResponse() {
    this.uploadResponse.status = '';
    this.uploadResponse.message = '';
    this.uploadResponse.uploadProgress = '0',
      this.uploadResponse.filePath = '';

  }


  ngOnDestroy(): void {
    // cancel all subscriptions to avoid memory leaks
    this.subscriptions.unsubscribe();
}

}