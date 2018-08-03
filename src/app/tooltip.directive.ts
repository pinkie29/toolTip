import { Directive,Input, HostListener, HostBinding,OnInit, ElementRef, Renderer2 } from '@angular/core';
const ESCAPE_KEYCODE = 27;
@Directive({
  selector: '[appTooltip]',  
})



export class TooltipDirective implements OnInit {

  @Input("appTooltip") text;
  @HostBinding("class.tooltipButton") tooltips:boolean = false;
  @HostBinding('class.tooltipButtonBottom') tooltipBottomStyle:boolean = false;

  currentActive = {};

  @HostListener("document:click", ["$event"])
  public onClick(targetElement) {
    if(this.elRef.nativeElement.contains(event.target)) {
      this.tooltips = true;
      if(!this.tooltips){
        this.tooltipBottomStyle = true;
      }
    } else {
      this.tooltips = false;
      if(!this.tooltips){
        this.tooltipBottomStyle = false;
      }
    }
  }

  @HostListener("click", ["$event.target"])
  onMouseClick(target): void {
    this.currentActive = target;
    this.tooltips = true;
  }

  // Closes the tooltip when the 'esc' key is pressed
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE_KEYCODE) {
      this.tooltips = false;
    }
  }

   // Changes placement of tool tip when at the edge of the screen
   @HostListener("window:scroll", [])
   onWindowScroll() {  
        if (this.elRef.nativeElement.getBoundingClientRect().top < 40) { 
          if(this.tooltips){
            this.tooltipBottomStyle = true;
            this.tooltips = false;
          } else if(this.tooltipBottomStyle) {
              this.tooltipBottomStyle = false;
              this.tooltips = true;
            }      
        }
        else {
          if(this.tooltips){
            this.tooltipBottomStyle = false;
            this.tooltips = true;
          } else if(this.tooltipBottomStyle) {
            this.tooltipBottomStyle = true;
            this.tooltips = false;
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
