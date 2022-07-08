$(document).ready(function(){
    const player1 = 'X';
    const player2 = 'O';
    const win = [['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']]; 
    let player1Turn = true;
    const idsPlayer1 = [];                       //creat array in order to store ID
    const idsPlayer2 = [];
    $('.cell').on('click' , function(){
        if(player1Turn){
            $(this).html(player1); 
            player1Turn = false;                //to be sure it is player1 turn
            const id = $(this).attr('id');      //get Id for the cell that clicked 
            idsPlayer1.push(id);               //push ID to complete an array
        }else{
            $(this).html(player2);            //same process for idsplayer2
            player1Turn = true; 
            const id = $(this).attr('id');
            idsPlayer2.push(id);
        }
        $(this).addClass('clicked');               //show me which cell is used
        isWinner(idsPlayer1 , win);
        isWinner(idsPlayer2 , win);
        tie(idsPlayer1, idsPlayer2);
        startNextGame(idsPlayer1 , idsPlayer2); //need arguments to connect dome with vanilla js
    })
})
let winner  = '';
const isWinner = function(idsPlayer , win){ //make a function to find the winner
    for(let i = 0 ; i < win.length ; i++){
        const line = win[i];
        let filterIds = idsPlayer.filter(id=>{  //filter idsplayer to find match ids
           return match(id , line); 
        })// use match function for realizeing which player should be winner
        if(filterIds.length === 3){//need 3 ids to find which player is winner
            alert('YOU WIN');
            winner = idsPlayer; 
            return true;
        }
    }
    return false;    //in order to continue 
}
const match = function(idPlayer , win){  //creat a function for match items
    for(let i = 0 ; i < win.length ; i++ ){
        if(idPlayer === win[i]){    
            return true;
        }
    }
    return false; 
}
const tie = function(idsPlayer1 ,idsPlayer2 ){//if dont have winner and all cells clicked so you are tied
    if(idsPlayer1 !== winner && idsPlayer2 !== winner && idsPlayer1.length + idsPlayer2.length  === 9){
       winner = 'IT IS TIED' ;
        alert(winner);
    }
}
const startNextGame = function(idsPlayer1 , idsPlayer2){
    if(winner === 'IT IS TIED'  || winner === idsPlayer1 || winner === idsPlayer2 ){
        location.reload();
    }
}
//if we have a winner or it is tied then start the new game.and make sure strict equality operator and have arguments
