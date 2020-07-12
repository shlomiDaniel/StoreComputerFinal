// @ts-ignore
import {Gpu} from '../gpu/gpu.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
 @Injectable({providedIn: 'root'})
export  class GpusService {
    constructor(public http: HttpClient){}
  //private gpus;
  private gpus: Gpu  = [];
  private gpusUpdated = new Subject<Gpu[]>();
  // tslint:disable-next-line:typedef

  getGpuByName(name,gpus){
    let array;
    array =  gpus.filter(data=>{
      return data.name===name;
    });
    return array;
  }
  getGpuByCompany(company,gpus){
    let array;
    array =  gpus.filter(data=>{
      return data.company===company;
    });
    return array;
  }
  
 
  getAndReturnGpus(){
    //return [...this.gpus];
     //this.http.get<{gpus: Gpu[]}>('http://localhost:4500/gpu').subscribe((gpuData)=>{
    this.http.get<{gpus: Gpu[]}>('http://localhost:4500/gpu').subscribe((gpuData)=>{
     this.gpus = gpuData ;
      console.log(this.gpus);
      
     
  
      
       this.gpusUpdated.next([...this.gpus]);
     
     
    });
    return this.gpus;
  }



  getGpus(){
    //return [...this.gpus];
     //this.http.get<{gpus: Gpu[]}>('http://localhost:4500/gpu').subscribe((gpuData)=>{
    this.http.get<{gpus: Gpu[]}>('http://localhost:4500/gpu').subscribe((gpuData)=>{
     this.gpus = gpuData ;
      console.log(this.gpus);
      
     
      
     //////// FOR US
      // let array;
      // array =  this.gpus.filter(data=>{
      //   return data.company==="ASUS";
      // });
      // console.log(array);
////////

      // this.gpus.find((u)=>{
      //      return u.name===name;
      // });
     // this.gpus = [...this.gpus];
     //console.log(this.gpus);
    // console.log(gpuData.gpus);
      //console.log(gpuData.gp);
       this.gpusUpdated.next([...this.gpus]);
       //this.gpusUpdated.([...this.gpus]);
     // console.log(this.gpus);
     
    });
  }
  // tslint:disable-next-line:typedef
  addGpu(name: string, company: string, price: string, imgPath: string, description: string, imgPathCompanyLogo: string, numOfStars: string){
    const gpu: Gpu = {
      name,
      company,
      price,
      imgPath,
      description,
      imgPathCompanyLogo,
      numOfStars
    };
    this.gpus.push(gpu);
    this.gpusUpdated.next([...this.gpus]);
  }

  // tslint:disable-next-line:typedef
  getPostUpdateListner(){
    return this.gpusUpdated.asObservable();
  }

}

