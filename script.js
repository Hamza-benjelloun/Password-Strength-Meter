const strengthMeter = document.getElementById('strength-meter');
const passwordInput = document.getElementById('password-input');
const reasonsContainer = document.getElementById('reasons');

passwordInput.addEventListener('input',updateStrengthMeter)
updateStrengthMeter()
function updateStrengthMeter(){
    const weaknesses = calculatePasswordStrength(passwordInput.value)
    let strength=100
    reasonsContainer.innerHTML=''
    weaknesses.forEach(weakness=>{
        if(weakness == null) return
        strength-= weakness.deduction
        const messageElt = document.createElement('div')
        messageElt.innerHTML = weakness.message
        reasonsContainer.appendChild(messageElt)
    })
    strengthMeter.style.setProperty('--strength',strength)
}

function calculatePasswordStrength(password){
    const weaknesses = [];
    weaknesses.push(lengthWeaknesses(password))
    weaknesses.push(lowercaseWeaknesses(password))
    weaknesses.push(uppercaseWeaknesses(password))
    weaknesses.push(numberWeaknesses(password))
    weaknesses.push(specialCharacterWeaknesses(password))

    return weaknesses
}

function lengthWeaknesses(password){
    const length = password.length
    if(length <= 5){
        return {
            message:'Your password is too short',
            deduction:40
        }
    }
    if(length<=10){
        return{
            message:'Your password couls be longer',
            deduction:15
        }
    }
}

function lowercaseWeaknesses(password){
    return characterTypeWeakness(password,/[a-z]/g,"lowercase characters")
}

function uppercaseWeaknesses(password){
    return characterTypeWeakness(password,/[A-Z]/g,"uppercase characters")
}

function numberWeaknesses(password){
    return characterTypeWeakness(password,/[0-9]/g,"numbers")
}

function specialCharacterWeaknesses(password){
    return characterTypeWeakness(password,/[^0-9a-zA-Z\s]/g,"special characters")
}

function characterTypeWeakness(password,regex,type){
    const matches = password.match(regex) || [] 
    if(matches.length===0){
        return {
            message: `Your password has no ${type}`,
            deduction: 20
        }
    }

    if(matches.length <= 2){
        return {
            message : `Your password could use ${type}`,
            deduction: 5
        }
    }
}