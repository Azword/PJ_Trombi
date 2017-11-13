import {Component, OnInit} from '@angular/core';
import {GlobalVarService} from "../global";
import {RequestService} from "../request.service";

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-updater',
    templateUrl: './updater.component.html',
    styleUrls: ['./updater.component.css']
})
export class UpdaterComponent implements OnInit {
    public global = this.globalVar;
    public updateInfo = {
        "uid": "",
        "name": "",
        "email": "",
        "img": "",
        "skills": "",
        "quote": "",
        "job": "",
        "position": "",
        "birth": "",
        "phone": "",
        "website": "",
        "team": ""
    };
    public helperTxt = {"title": "", "body": ""};
    public imgLink = 'https://icon-icons.com/icons2/582/PNG/512/spy_icon-icons.com_55034.png';
    public teamName = [
        {id: 1, name: "CT_ALPHA"},
        {id: 2, name: "CT_CHARLY"},
        {id: 3, name: "CT_COSI"},
        {id: 4, name: "CT_SNATCH"},
        {id: 5, name: "CT_THOR"},
        {id: 6, name: "CT_TECH"},
        {id: 7, name: "CT_KAPLA"},
        {id: 8, name: "CT_DUPLO"},
        {id: 9, name: "CT_POPA"},
        {id: 10, name: "CT_LEGO"},
        {id: 11, name: "CT_FOXTROT"}
    ];
    private hasImage = false;
    private base64textString;

    constructor(private globalVar: GlobalVarService, private requestService: RequestService) {
    }


    ngOnInit() {
        this.global.actualPage = 'Trombinoscope';
        this.updateInfo.uid = this.global.user;
        this.getData();
        $(document).ready(function () {
            $('select').material_select();
            $('.submit_on_enter').keydown(function(event) {
                if (event.keyCode == 13) {
                    this.form.submit();
                    return false;
                }
            });

        });
        $('select').change((e) => {
            this.updateInfo.team = e.currentTarget.value;
        });
    }

    public tryUpdate(): void {
        this.requestService.updateUser(this.updateInfo).then(
            success => {
                console.log(success.data);
            },
            error => {
                console.log(error);
            }
        );
        this.global.page++;
    }


    public getData(): void {
        this.requestService.getUser({"uid": this.updateInfo.uid}).then(
            success => {
                console.log(success);
                this.updateInfo = success.data;
		$('label').addClass('active');
                if (this.updateInfo.img) {
                    this.imgLink = this.updateInfo.img;
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    handleFileSelect(evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
            this.hasImage = true;
        }
    }

    public getImgBase64(s) {
       if (s) {
           return ('data:image/jpeg;base64,' + s);
       } else {
           return ('./assets/no_img.jpg');
       }
    }

    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
        console.log(btoa(binaryString));
    }

    public helper(n): void {
        if (n === -1) {
            this.helperTxt.title = 'Salut !';
            this.helperTxt.body = 'Je suis Poppy je suis là pour vous aider :)'
        }
        else if (n === 0) {
            this.helperTxt.title = 'File';
            this.helperTxt.body = 'Merci de renseigner ici une image de moins de 20Ko'
        }
        else if (n === 1) {
            this.helperTxt.title = 'Post Occupé';
            this.helperTxt.body = 'Merci de renseigner ici votre emploi (Developpeur, etc..)'
        }
        else if (n === 2) {
            this.helperTxt.title = 'Citation';
            this.helperTxt.body = 'Merci de renseigner ici une citation qui vous tient à coeur'
        }
        else if (n === 3) {
            this.helperTxt.title = 'Téléphone';
            this.helperTxt.body = 'Merci de renseigner ici votre numéro de téléphone'
        }
        else if (n === 4) {
            this.helperTxt.title = 'Site Internet';
            this.helperTxt.body = 'Merci de renseigner ici votre site internet, ou un que vous affectionnez'
        }
        else if (n === 5) {
            this.helperTxt.title = 'Team';
            this.helperTxt.body = 'Merci de renseigner ici votre nom d\'equipe'
        }
        $('.tap-target').tapTarget('open');
    }
}
