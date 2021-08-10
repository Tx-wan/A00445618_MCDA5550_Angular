import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name!: string;
  address!: string;
  phone!: string;
  search! : string;
  errorMessage!: string;
  message!: string;
  result!: string;
  universities = ["University"];

  constructor(private http:HttpClient){}

  ngOnInit() {
    this.universities.length=0;
  }

  saveUniversity() {

    console.log(this.name, this.address, this.phone)

    const data = {'Name':this.name, 'Address':this.address, 'PhoneNumber':this.phone}
    const jsondata = JSON.stringify(data)
    localStorage.setItem('UniversityData', jsondata)

    if(!this.checkForm()) {
      alert("format");
      return;
    } 

      this.http.post<any>("http://dev.cs.smu.ca:8100/saveUniversity", data).subscribe({
        next: data => {
          this.message = data.message;
          console.log(this.message);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error("Error:", error);
        }
      })

      alert("saved");
    
  }

  displayUniversity() {
    console.log(this.name, this.address, this.phone)
    const data = {'Name':this.name, 'Address':this.address, 'PhoneNumber':this.phone}
    const disp_data = localStorage.getItem('UniversityData')
    console.log(disp_data)

    this.universities.length = 0;

    this.http.post<any>("http://dev.cs.smu.ca:8100/readUniversity", data).subscribe({
      next: data => {
        //var universities = data;

            if (data == null || data.length == 0) {           
                alert("No record found"); //no record whatsoever, let the user know
            } else {
                alert('Records downloaded successfully!');

              //go through each record
              for (var i = 0; i < data.length; i++) {

                  var name = data[i].Name;//Name attribute
                  var address = data[i].Address; // Address attribute
                  var phone = data[i].PhoneNumber; //PhoneNumber attribute

                  this.universities.push(name+'\t'+address+'\t'+phone);

              }//end for
            }//end else 
        this.message = data.message;
        this.result = data.result;

        console.log(this.message);
        console.log(this.result);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error("Error:", error);
      }
    })
  }

  searchUniversity() {
    console.log(this.name, this.address, this.phone)
    const data = {'Name':this.name, 'Address':this.address, 'PhoneNumber':this.phone}
    const disp_data = localStorage.getItem('UniversityData')
    console.log(disp_data)

    this.http.post<any>("http://dev.cs.smu.ca:8100/readUniversity", data).subscribe({
      next: data => {
        //var universities = data;
            if (data == null || data.length == 0) {           
                alert("No record found"); //no record whatsoever, let the user know
            } else {
            //    alert('Records downloaded successfully!');

              //go through each record
              for (var i = 0; i < data.length; i++) {

                  var name = data[i].Name;//Name attribute
                  var address = data[i].Address; // Address attribute
                  var phone = data[i].PhoneNumber; //PhoneNumber attribute

                  if (name == this.search) {
                    this.name = name;
                    this.address = address;
                    this.phone = phone;

                    i = -1;
                    break;
                  }

              }//end for

              if ( i != -1) {
                alert("No record found");
              }
            }//end else 
        this.message = data.message;
        this.result = data.result;

        console.log(this.message);
        console.log(this.result);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error("Error:", error);
      }
    })
  }

  deleteUniversity() {

    console.log(this.name, this.address, this.phone)

    const data = {'Name':this.name, 'Address':this.address, 'PhoneNumber':this.phone}

    this.http.post<any>("http://dev.cs.smu.ca:8100/removeUniversity", data).subscribe({
      next: data => {
        this.message = data.message;
        alert('Removed sucessfully')
        console.log(this.message);
      },
      error: error => {
        this.errorMessage = error.message;
        alert("Error:"+error)
        console.error("Error:", error);
      }
    })
  }

  checkForm() {
    var name = this.name;
    var address = this.address;
    var phone = this.phone; 
    var pattern = /[a-z]/i;
    var result = true;
  
    //check empty fields
    if (name == '') {
        alert("Please enter the name of the university!");
        result = false;
    }
    if (address == '') {
        alert("Please enter the address of the university!");
        result = false;
    }
    if (phone == '') {
        alert("Please enter the phone number of the university!");
        result = false;
    }

    if (!(pattern.test(address))) {
      alert("Address should contain letters!");
      result = false;
    }

    return result;
  }
}


