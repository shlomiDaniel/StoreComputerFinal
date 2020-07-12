import { Component, OnInit, OnDestroy } from '@angular/core';
// @ts-ignore
import {Gpu} from '../gpu/gpu.model';
import {GpusService} from '../gpu-list/gpus.service';
import {Subscription, concat} from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  implements OnInit, OnDestroy {
  gpus: Gpu [] = [];
  filteredArrayProduct= [];
  filteredArray =[];
  enteredValue="";
  clickMe(){
    //this.name = this.enteredValue;
    this.gpus =   this.gpusService.getAndReturnGpus();
    
    this.filteredArray = this.gpusService.getGpuByName(this.enteredValue,this.gpus).concat(this.gpusService.getGpuByCompany(this.enteredValue,this.gpus));
    // console.log("here");
 //   console.log(this.filteredArray);
    this.filteredArrayProduct = this.filteredArray;
    console.log(this.filteredArrayProduct);
    //this.name = this.filteredArray;
  }
  private gpusSub: Subscription;
  gpusService: GpusService;
  constructor(gpusService: GpusService) {
    this.gpusService = gpusService;
  }

  ngOnInit(): void {
    this.gpusService.getGpus();
    //  console.log(this.gpusService.getGpuByName("ASUS", this.gpusService.getGpus()));
    this.gpusSub = this.gpusService.getPostUpdateListner().subscribe((gpus: Gpu[]) => {
      this.gpus = gpus;
    });
  }

  ngOnDestroy(){
    this.gpusSub.unsubscribe();

  }

}
