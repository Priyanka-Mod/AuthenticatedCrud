import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormArray , FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SearchCountryField,CountryISO,PhoneNumberFormat} from "ngx-intl-tel-input";
import { UserDataService } from '../user-detail.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userForm:FormGroup;
  minDate = new Date('01/01/2000');
  maxDate = new Date();
  
  separateDialCode:boolean = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];


  catagories: {name:string}[];

  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private userdata:UserDataService,
              private http:HttpClient) {
      this.catagories = [
        {name: 'SSC'},
        {name: 'HSC'},
        {name: 'Bachelors'},
        {name: 'Masters'}
    ];
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      number: ["", Validators.required],
      education: this.formBuilder.group({
        institute: ['', Validators.required],
        catagory: ['', Validators.required],
        percentage: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      }),
      hobby: this.formBuilder.group({
        music: [''],
        art: [''],
        dance: [''],
        read: ['']
       }),
      gender: ['', Validators.required],
      address: this.formBuilder.array([]),
      summary: ['']
    });

    if (this.userForm) {
      this.userdata.getUserFormData().subscribe(formData => {
        
        const updateValue = {
          name: formData.name,
          dob: formData.dob,
          email: formData.email,
          number: formData.number,
          education:{
            institute: formData.education.institute,
            catagory: formData.education.catagory,
            percentage: formData.education.percentage,
          },
          gender: formData.gender,
          summary: formData.summary,
          
        }
        const hobby:object = {}
        for(let key in formData.hobby){
          if(formData.hobby[key.length]>0) {
            hobby[key]=formData.hobby[key]
          }
        }
        updateValue['hobby']=hobby;

        for(let a of formData.address){
          this.address.push(this.createAddress(a))
          this.userForm.patchValue(a)
        }
        this.userForm.patchValue(updateValue);
      })
    }
  }
  
  get userFormControl(){
    return this.userForm.controls;
  }

  createAddress(a) : FormGroup {
    return this.formBuilder.group({
      addedAddress: a.addedAddress
    });
  }

  get address(): FormArray {
    return this.userForm.controls["address"] as FormArray;
  }

  addAddress() : void {
    const newAddress = this.formBuilder.group({
      addedAddress: ''
    })
    this.address.push(newAddress);
  }
  onSubmit() : void {
    // this.userdata.setUserFormData(this.userForm.value);

    this.http.post('http://localhost:3000/user-detail',this.userForm.value).subscribe((result)=>{
        if(result){
          this.router.navigate(['/details'])
        }
      })
    console.log(this.userForm.value)
    // this.router.navigate(['/details'])
  }
}