
function ICM(n) {
      //Debe ser mayor a 0
      if (n <= 0) {
          console.log("No puede ser cero.");
          return;
      }
  
        //Cuadrado incremento hasta n
      for (let x = 1; x <= n; x++) {
          let f = "";
          for (let y = 1; y <= n; y++) {
              f += x;
          }
          console.log(f);
      }
      //decremento desde n
      for (let x = n - 1; x >= 1; x--) {
          let c = "";
          for (let y = 1; y <= n; y++) {
              c += x;
          }
          console.log(c);
      }
  }
  
  ICM(3);
