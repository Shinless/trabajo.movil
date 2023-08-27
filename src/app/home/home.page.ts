import { Component, OnInit } from '@angular/core';
import { UserModel } from '../Models/UserModel';
import { IUserLogin } from '../Models/IUserLogin';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  // Coloca los imports aquí, fuera del objeto de configuración del componente
  // Importa solo los módulos que necesitas en este componente
  // Por ejemplo, IonicModule y FormsModule
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule]})
  
export class HomePage implements OnInit {

  listUser: UserModel[] = [
    new UserModel('Pedro','Jale','jaleP@gmail.com',undefined,'USUARIO','Pjale','jale123')
  ];

  userLoginModal: IUserLogin = {
    username: '',
    password: ''
  };

  constructor(private route: Router) { }

  ngOnInit() {
    this.userLoginModalRestart();
  }

  userLogin(userLoginInfo: IUserLogin): boolean{
    for(let i = 0; i < this.listUser.length; i++){
      if((this.listUser[i].username == userLoginInfo.username) && (this.listUser[i].password == userLoginInfo.password)){
        console.log('User Loged...', this.userLoginModal.username, this.userLoginModal.password);
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        if(this.listUser[i].type == 'USUARIO'){
          let sendInfo = this.route.navigate(['/usuario'], userInfoSend);
          return true;
        }else{
          let sendInfo = this.route.navigate(['/admin'], userInfoSend);
          return true;
        }
      }
    }
    this.userLoginModalRestart();
    return false;
    
  }

  userLoginModalRestart(): void{
    this.userLoginModal.username = '';
    this.userLoginModal.password = '';
  }
}