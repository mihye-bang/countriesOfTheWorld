/**
 * Description: The TypeScript file of the web application that displays 239 countries with the
 *              national flags and names using Angular Material. The users can sort the country display
 *              based on the continent, see application information with the info button on the
 *              toolbar, and click each mat-card to see the detail of the country.
 * Date: August 14, 2022
 */

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NationDialogComponent } from './nation-dialog/nation-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // properties
  nations: any;
  // dialog: any;  can be removed by using 'private' keyword to const param dialog
  orderBy = "all";
  allNations: any;

  // inject HttpClient service here
  constructor(http: HttpClient, private dialog: MatDialog) {
    // this.dialog = dialog; // so we can use dialog as local var anywhere that's retrieved from const param, but can be removed by using keyword 'private'

    // fetch country JSON
    const URL = "assets/country.json";
    http.get(URL).subscribe({
      // success
      next: (json: any) => {
        this.allNations = json.Country;
        this.nations = json.Country;  // type mismatch problem: underline on Country ->solution: 1. json:'any' on params
        // solution 2: create object and pass that object to avoid the mismatch (without json:'any')
        // let obj: any = json;
        // this.nations = obj.Country;

        // sort after retrieving JSON. Afganistan should be the 1st country to display
        this.nations.sort((a: any, b: any) => a.Name.localeCompare(b.Name));
        this.allNations.sort((a: any, b: any) => a.Name.localeCompare(b.Name));

        console.log("loaded JSON: " + this.nations.length);
        console.log(this.nations[0]);
      },

      // failed
      error: (err) => {
        console.log("[ERROR] " + err.message);
      }
    });
  }

  /// generate a src URL based on the 2-digit country code
  getFlagName(code: string): string { // nation: custom object type, will return string type
    let url = "assets/flags/" + code.toLowerCase() + ".jpg";
    return url;
  }

  // open dialog when user click on a card
  openDialog(nation: any) {
    // configure the dialog
    let config = new MatDialogConfig();
    config.width = "80%";
    config.height = "auto";
    config.data = nation;

    // finally open the dialog
    this.dialog.open(NationDialogComponent, config);
  }

  openInfo() {
    let config = new MatDialogConfig();
    config.width = "80%";
    config.height = "auto";

    this.dialog.open(InfoDialogComponent, config);
  }

  // event handler for the radio
  handleContinentBy() {
    if (this.orderBy === "africa") {
      this.nations = this.allNations.filter((nation: any) => nation.Continent === 'Africa');
    } else if (this.orderBy === "asia") {
      this.nations = this.allNations.filter((nation: any) => nation.Continent === 'Asia');
    } else if (this.orderBy === "europe") {
      this.nations = this.allNations.filter((nation: any) => nation.Continent === 'Europe');
    } else if (this.orderBy === "northAmerica") {
      this.nations = this.allNations.filter((nation: any) => nation.Continent === 'North America');
    } else if (this.orderBy === "southAmerica") {
      this.nations = this.allNations.filter((nation: any) => nation.Continent === 'South America');
    } else if (this.orderBy === "antarctica") {
      this.nations = this.allNations.filter((nation: any) => nation.Continent === 'Antarctica');
    } else if (this.orderBy === "oceania") {
      this.nations = this.allNations.filter((nation: any) => nation.Continent === 'Oceania');
    } else {
      this.nations = this.allNations;
    }
  }
}
