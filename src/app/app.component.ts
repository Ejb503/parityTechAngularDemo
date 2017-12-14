import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import * as d3 from 'd3';
import { colorSets as ngxChartsColorsets } from '@swimlane/ngx-charts/release/utils/color-sets';
declare var job:any; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  job: any = job;
  // Titles for app. Put all the code into one file for ease of analysis, @TODO in a real app would split each section into a component for easier maintaince. 
  title = 'app';

  // Preparing the mixed Objects / Values of javascript Object to be converted to Array for iteration
  methodologyProperties : any = Object.keys(job.methodology);
  methodology : any = [];

  // Preparing the mixed Objects / Values of javascript Object to be  converted to Array for iteration
  miscProperties : any = Object.keys(job.misc);
  misc: any = [];

  // Preparing the mixed Objects / Values of javascript Object to be converted to Array for iteration
  profileProperties : any = Object.keys(job.profile);
  profileResults : any = [];  

  // Preparing the mixed Objects / Values of javascript Object to be converted to Array for iteration
  technologyProperties : any = Object.keys(job.technologies);
  technologyPropertiesOneof : any = Object.keys(job.technologies.oneof);
  technology : any = [];

  // Preparing the mixed Objects / Values of javascript Object to be converted to Array for iteration
  specProperties: any = Object.keys(job.specs);
  numberCards: any = [];

  // Passing the variables for the D3 Piechart
  view = [950,300];
  colorScheme = 'natural';

  // Filter for table
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // Data for table
  displayedColumns = ['key', 'value'];
  dataSource = new MatTableDataSource();

  // Function for 'Chip' feature
  value = 0;
  setValue(value) {
  	this.value = value;
  }

  ngOnInit() {

  	console.log(job);
  	// Passing the Javascript Object as is
  	this.job = job;

  	// A few manipulations where data is uniform enough to be iterated
	for (let key of this.methodologyProperties) { 
	    this.methodology.push({key: key,value: this.job.methodology[key]});
	}
	for (let key of this.miscProperties) { 
	    this.misc.push({key: key,value: this.job.misc[key]});
	}
	for (let key of this.profileProperties) { 
	    this.profileResults.push({name: key,value: this.job.profile[key]});
	}
	for (let key of this.specProperties) { 
		if(key == 'corehours'){
		    this.numberCards.push({value: key,name: this.job.specs[key]['from']+'-'+this.job.specs[key]['to']});
		}else{
	    	this.numberCards.push({value: key,name: this.job.specs[key]});
		}
	}

	for (let key of this.technologyProperties) { 
		if(key == 'oneof'){
			for (let subKey of this.technologyPropertiesOneof) { 
				var result = this.returnValue(this.job.technologies['oneof'][subKey]);
	    		this.technology.push({value: result,name: subKey});
	    	}
		}else{
			var result = this.returnValue(this.job.technologies[key]);
	    	this.technology.push({value: result,name: key});
	    }
	}
    this.dataSource = new MatTableDataSource(this.misc);
  }

  returnValue(value) {

  	// This function should be in a service, however because it is a small app I am hacking it in here
	if(value == "Familiar"){
		return 1;
	}
	if(value == "Good"){
		return 2;
	}
	if(value == "Expert"){
		return 3;
	}

  }
}


