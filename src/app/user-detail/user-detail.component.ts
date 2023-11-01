import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormArray , FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SearchCountryField,CountryISO,PhoneNumberFormat} from "ngx-intl-tel-input";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UserDataService } from 'src/user-data.service';

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
              private http:HttpClient,
              private datePipe: DatePipe,
              private userService:UserDataService,
              private route: ActivatedRoute) {
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

    const userId = this.route.snapshot.params['id'];

    if (userId) {
      this.userService.editUser(userId).subscribe(formUserData => {
        console.log(formUserData,'edit from table')
        const formattedDob = this.datePipe.transform(formUserData.dob, 'dd/MM/yyyy');
        const updateValue = {
          name: formUserData.name,
          dob: formattedDob,
          email: formUserData.email,
          number: formUserData.number,
          education:{
            institute: formUserData.education.institute,
            catagory: formUserData.education.catagory,
            percentage: formUserData.education.percentage,
          },
          gender: formUserData.gender,
          summary: formUserData.summary,
          
        }
        const hobby:object = {}
        for(let key in formUserData.hobby){
          if(formUserData.hobby[key]) {
            hobby[key]=formUserData.hobby[key]
          }
        }
        updateValue['hobby']=hobby;

        for(let address of formUserData.address){
          this.address.push(this.createAddress(address))
          this.userForm.patchValue(address)
        }
        this.userForm.patchValue(updateValue);
      })
    }
  }
  
  get userFormControl(){
    return this.userForm.controls;

  }

  createAddress(address) : FormGroup {
    return this.formBuilder.group({
      addedAddress: address.addedAddress
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

  onSubmitUser() : void {
    if (this.userForm.valid) {
      if (this.route.snapshot.params['id']) {
        // Editing an existing user
        const userId = this.route.snapshot.params['id'];
        this.userService.updateSingleUser(userId, this.userForm.value).subscribe((userData) => {
          if (userData) {
            this.router.navigate(['/user-list']);
          }
        });
      } 
      else {
        // Adding a new user
        this.userService.updateUser(this.userForm.value).subscribe((userData) => {
          if (userData) {
            this.router.navigate(['/user-detail']);
          }
        });
      }
    } 
  }

  onShowAllUser(){
    this.router.navigate(['/user-list'])
  }

  cancelButton(){
    this.router.navigate(['/user-list'])
  }

}