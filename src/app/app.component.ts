import { Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.signOfType = new FormGroup({
      'userData' : new FormGroup({
      'username' : new FormControl('Samarth', [Validators.required, this.getForbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
    }),      
      'gender' : new FormControl('male', [Validators.required]),
      'hobbies' : new FormArray([])
    })
    //   this.signOfType.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signOfType.statusChanges.subscribe(
      (status) => console.log(status)
    );
    this.signOfType.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    this.signOfType.patchValue({
      'userData': {
        'username': 'Anna',
      }
    });
  }
  genders = ['male', 'female'];
  forbiddenUserName = ['abc','xyz'];
  
  signOfType : FormGroup;

OnSubmit(){
  console.log(this.signOfType);
}

OnHobby(){
  const control = new FormControl(null, Validators.required);
  (<FormArray>this.signOfType.get('hobbies')).push(control);
}
getControls(){
  return (<FormArray> this.signOfType.get('hobbies')).controls;
}
  getForbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserName.indexOf(control.value) != -1) {
    return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
