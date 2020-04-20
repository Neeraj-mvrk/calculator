import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator';
  subText = '';
  mainText = '';
  answered = false;
  

  pressKey(key: string) {
    if (this.mainText.length === 20) {
      return;
    }
    if(key==='x'){
      key = '*'
    }
    this.mainText += key;
    this.subText=this.mainText;
    
  }

  allClear() {
    this.mainText = '';
    this.subText = '';
    this.answered= false;
  }

  
  getAnswer(){
    const lastKey = this.mainText[this.mainText.length - 1];
      if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
        this.mainText=this.mainText.slice(1,-1);
        this.subText=this.mainText;
      }
    this.mainText=this.calculate(this.parseCalculationString(this.mainText));
    this.answered = true;
  }

  parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    var calculation = [],
        current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
        if ('^*/+-'.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current != '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}

calculate(calc) {
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [{'^': (a, b) => Math.pow(a, b)},
               {'*': (a, b) => a * b, '/': (a, b) => a / b},
               {'+': (a, b) => a + b, '-': (a, b) => a - b}],
        newCalc = [],
        currentOp;
    for (var i = 0; i < ops.length; i++) {
        for (var j = 0; j < calc.length; j++) {
            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = 
                    currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
            console.log(newCalc);
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0];
    }
}
}
