local hunger = 45
local thirst = 45

-- @main

if HUD.framework == 'ESX' then
    TriggerEvent('esx_status:getStatus', 'hunger', function(status)
        if status then hunger = status.val / 10000 end
    end)
    TriggerEvent('esx_status:getStatus', 'thirst', function(status)
        if status then thirst = status.val / 10000 end
    end)
elseif HUD.framework == 'QB-Core' then
    RegisterNetEvent('hud:client:UpdateNeeds', function(newHunger, newThirst)
        hunger = newHunger
        thirst = newThirst
    end)
end

CreateThread(function ()
    while true do
        local player = PlayerPedId()
        if not IsPauseMenuActive() then
            SendNUIMessage({
                toggle = true,
                armour = GetPedArmour(player),
                health = GetEntityHealth(player) - 100,
                hunger = math.floor(hunger),
                thirst = math.floor(thirst),
                config = {HUD.health, HUD.armour, HUD.hunger, HUD.thirst,}
            })
        else
            SendNUIMessage({
                toggle = false
            })
        end
        Wait(1000)
    end
end)

CreateThread(function()
	Wait(100)
	while true do
		local radarEnabled = IsRadarEnabled()
        local player = PlayerPedId()
		if not IsPedInAnyVehicle(player) and radarEnabled then
            SendNUIMessage({
                action = 'notinveh'
            })
			DisplayRadar(false)
		elseif IsPedInAnyVehicle(player) and not radarEnabled then
            SendNUIMessage({
                action = 'inveh'
            })
			DisplayRadar(true)
		end
		Wait(500)
	end
end)
