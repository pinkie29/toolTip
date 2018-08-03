import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TooltipComponent } from "./tooltip/tooltip.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: "home", component: HomeComponent },
  { path: "tooltip", component: TooltipComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
