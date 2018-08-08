import { Directive,Input, HostListener, HostBinding,OnInit, ElementRef, Renderer2 } from '@angular/core';

const ESCAPE_KEYCODE = 27;

@Directive({
  selector: '[showTooltip]',  
})

export class TooltipDirective implements OnInit {

  @Input("showTooltip") text;
  @HostBinding("class.tooltipButton") tooltipTopStyle:boolean = false;
  @HostBinding('class.tooltipButtonBottom') tooltipBottomStyle:boolean = false;

  @HostListener("document:click", ["$event"])
  public onClick(targetElement) {
    if(this.elRef.nativeElement.contains(event.target)) {      
      if(!this.tooltipTopStyle && this.elRef.nativeElement.getBoundingClientRect().top < 40){
        this.tooltipBottomStyle = true;
      }
      else {
        this.tooltipTopStyle = true;
      }
    } else {      
      if(!this.tooltipTopStyle && this.elRef.nativeElement.getBoundingClientRect().top < 40){
        this.tooltipBottomStyle = false;
      }
      else {
        this.tooltipTopStyle = false;
      }
    }
  }

  @HostListener("click", ["$event.target"])
  onMouseClick(target): void {
    if (this.elRef.nativeElement.getBoundingClientRect().top < 40) {
      this.tooltipBottomStyle = true;
    }
    else {
      this.tooltipTopStyle = true;
    }
  }

  // Closes the tooltip when the 'esc' key is pressed
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE_KEYCODE) {
      this.tooltipTopStyle = false;
      if(!this.tooltipTopStyle){
        this.tooltipBottomStyle = false;
      }
    }
  }

   // Changes placement of tool tip when at the edge of the screen
   @HostListener("window:scroll", [])
   onWindowScroll() {  
        if (this.elRef.nativeElement.getBoundingClientRect().top < 40) { 
          if(this.tooltipTopStyle){            
            this.tooltipBottomStyle = true;
            this.tooltipTopStyle = false;
          } else if(this.tooltipBottomStyle) {
              this.tooltipBottomStyle = true;
              this.tooltipTopStyle = false;
            }      
        }
        else {
          if(this.tooltipTopStyle){
            this.tooltipBottomStyle = false;
            this.tooltipTopStyle = true;
          } else if(this.tooltipBottomStyle) {
            this.tooltipBottomStyle = false;
            this.tooltipTopStyle = true;
          }   
        }
   }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const mySpan = this.renderer.createElement("span");
    const text = this.renderer.createText(this.text);
    this.renderer.addClass(mySpan, "tooltip");
    this.renderer.appendChild(mySpan, text);
    this.renderer.appendChild(this.elRef.nativeElement, mySpan);
  }

}
