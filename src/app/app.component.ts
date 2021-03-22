import { CurrencyPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public fg: FormGroup;

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) {}

  ngOnInit() {
    this.fg = this.fb.group({
      address: this.fb.group({
        street: [100, Validators.required],
        classNumber: 400
      })
    });

    const streetControl = this.fg.get(["address", "street"]);

    // change value with pipe
    streetControl.valueChanges.subscribe(value => {
      console.log(value);
      if (!!value) {
        const pipeValue = this.currencyPipe.transform(
          value.replace(/\D/g, "").replace(/^0+/, ""),
          "RUS",
          "",
          "1.0-2"
        );
        streetControl.patchValue(pipeValue, { emitEvent: false });
      }
    });
  }

  public saveValue(event: Event, control: AbstractControl): void {
    const value = (event.target as HTMLInputElement).value;
    // const pipeValue = this.currencyPipe.transform(
    //   value.replace(/\D/g, "").replace(/^0+/, ""),
    //   "RUS",
    //   "",
    //   "1.0-2"
    // );
    console.log(value);

    control.patchValue(value);
  }
}
