
mysteriousOrganism();



function mysteriousOrganism() {

// Returns a random DNA base
  const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
  };

  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 16; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };

  const pAequorFactory = (specimenNum, dna) => {

    return {
      specimenNum,
      dna,
      //create new dna with different base which should not be the same as before
      //for exampe: if base = A, new base can be C,G,T, but can not be A
      mutate() {
        let mutateDna = [];
        let randBase = returnRandBase();
        for (base of this.dna) {
          while (base === randBase) {
            randBase = returnRandBase();
          }
          mutateDna.push(randBase);

        }


        return mutateDna;
      },
      //compare DNA and it locations of 2 objects
      compareDna(compObj) {
        let count = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === compObj.dna[i])
            count++;
        }

        return console.log(`Specimen #${this.specimenNum} compares with Specimen #${compObj.specimenNum} and 
        they are have ${count} bases or ${((count / this.dna.length) * 100).toFixed(2)}% DNA  in common.`);
      },
      //determine can organism survive or not
      willLikelySurvive() {
        let usefulBase = this.dna.filter(el => el === 'C' || el === 'G');
        return usefulBase.length/this.dna.length >= 0.6; 
      },
      complemetnStrand() {
        const complementDna = [];
        this.dna.forEach(base => {switch (base) {
          case ('A') : {
            complementDna.push('T');
            break;
          };
          case ('T') : {
            complementDna.push('A');
            break;
          };
          case ('C') : {
            complementDna.push('G');
            break;
          };
          case ('G') : {
            complementDna.push('C');
            break;
          };
          default : {
            console.log('This base cannot be!!!!');
          }
        }
        });
        return complementDna;
      },


    };
  };

// create 30 instances which can survive
  const pAequor = [];
  let idCounter = 1;
 while (pAequor.length <= 30) { 
  const obj = pAequorFactory(idCounter, mockUpStrand());
    if(obj.willLikelySurvive()) {
     pAequor.push(obj);
      };
      idCounter++;
  };


// --------------- simple tests ---------------
let firstObject = pAequorFactory(1, mockUpStrand());
let objWithMutate = firstObject.mutate();
let compareObject = pAequorFactory(2, mockUpStrand());
//---- test mutate method ---- 

//console.log(`firstObject: ${firstObject.dna}`);
//console.log(`objWithMutate:    ${objWithMutate}`);

// ---- test compareDna method ----

//console.log(firstObject.dna);
//console.log(compareObject.dna);
//firstObject.compareDna(compareObject);

//---- test willLikelySurvive method ----
//console.log(firstObject.dna);
//console.log(firstObject.willLikelySurvive());

//---- test complementStrand method ----
//console.log(firstObject.dna);
//console.log(firstObject.complemetnStrand());


//---- check pAequor ----
//console.log(pAequor);

}

