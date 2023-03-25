$(document).ready(function() {  
    console.log('^3BCS-hud^0 by B O S C H#4014. https://discord.gg/yMV5A9RBcw')
    window.addEventListener('message', function(event) {
        var data = event.data;

        if (data.toggle == true) {
            $('.hud-container').css('opacity', '1')
            $('#health').css('width', data.health + '%')
            $('#armour').css('width', data.armour + '%')
            $('#hunger').css('width', data.hunger + '%')
            $('#thirst').css('width', data.thirst + '%')
        } else if (data.toggle == false) {
            $('.hud-container').css('opacity', '0')
        }
        
        if (data.action == 'inveh') {
            $('.hud-container').css('bottom', '12vw')
        } else if (data.action == 'notinveh') {
            $('.hud-container').css('bottom', '2vw')
        }

        if (data.armour > data.config[1]) {
            fadeHUD('In', 'armour')
        } else {
            fadeHUD('Out', 'armour')
        }
        if (data.health < data.config[0]) {
            fadeHUD('In', 'health')
        } else {
            fadeHUD('Out', 'health')
        }
        if (data.hunger < data.config[2]) {
            fadeHUD('In', 'hunger')
        } else {
            fadeHUD('Out', 'hunger')
        }
        if (data.thirst < data.config[3]) {
            fadeHUD('In', 'thirst')
        } else {
            fadeHUD('Out', 'thirst')
        }

        // @functions

        function fadeHUD(type, hud) {
            if (type == 'Out') {
                $(`#${hud}-hud`).css("opacity", "0");
            setTimeout(function(){
                $(`#${hud}-hud`).css("height", "0");
                $(`#${hud}-hud`).css("margin", "0");
            }, 500);
            } else if (type == 'In') {
                $(`#${hud}-hud`).css("height", "2vh");
                $(`#${hud}-hud`).css("margin", ".3vh 0 .3vh 0");
                setTimeout(function(){
                    $(`#${hud}-hud`).css("opacity", "1");
                }, 500);
            }
        }
    });
});