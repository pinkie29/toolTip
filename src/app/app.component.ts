import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isClassVisible:boolean = false;
  public addHeightButtonText = 'Add height';

  
  clickEvent(){
      this.isClassVisible = !this.isClassVisible;
      if(this.isClassVisible) {
        this.addHeightButtonText = 'Reduce height';
      }
      else {
        this.addHeightButtonText = 'Add height';
      }      
  }
  
}
