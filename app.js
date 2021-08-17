document.addEventListener('DOMContentLoaded', () =>{
    const gridDisplay = qs('.grid')
    const scoreDisplay = id('score')
    const resultDisplay = id('result')
    const width = 4
    let squares = []
    let score = 0

    function createBoard(){
        for (let i = 0; i < width * width; i++)
        {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
    }
    createBoard()

    function generate()
    {
        scoreDisplay.innerHTML = score
        console.log("score!!!:", score)
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) 
        squares[randomNumber].innerHTML = 2;
        else{
            checkForLose()
            generate()
        }
    }
    
    function moveLeft()
    {
        for (let i = 0; i < 16; i++)
        {
            if (i % 4 === 0 )
            {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = columnParseInt(totalOne, totalTwo, totalThree, totalFour)
                console.log(row)

                let filteredRow = row.filter(num => num)
                console.log(filteredRow)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                // let newRow = zeros.concat(filteredRow)
                let newRow = filteredRow.concat(zeros)

                for (let j = 0; j < 4; j++)
                {
                    squares[i + j].innerHTML = newRow[j]
                }
            }
        }
    }

    // 32:29
    function moveRight()
    {
        //for (let i = 3; i <= 15; i += 4)
        for (let i = 0; i < 16; i++)
        {
            if (i % 4 === 0)
            {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = columnParseInt(totalOne, totalTwo, totalThree, totalFour)

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                // let newRow = zeros.concat(filteredRow)
                let newRow = zeros.concat(filteredRow)

                for (let j = 0; j < 4; j++)
                {
                    squares[i + j].innerHTML = newRow[j]
                }
        
            }
        }
    }

    function moveUp()
    {
        for (let i = 0; i < 4; i++)
        {
            totalOne = squares[i].innerHTML
            totalTwo = squares[i + width].innerHTML
            totalThree = squares[i + width * 2].innerHTML
            totalFour = squares[i + width * 3].innerHTML

            let column = columnParseInt(totalOne, totalTwo, totalThree, totalFour)

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            
            for (let j = 0; j < 4; j++)
            {
                squares[i + width * j].innerHTML = newColumn[j]
            }
        }
    }

    function moveDown()
    {
        for (let i = 0; i < 4; i++)
        {
            totalOne = squares[i].innerHTML
            totalTwo = squares[i + width].innerHTML
            totalThree = squares[i + (width * 2)].innerHTML
            totalFour = squares[i + (width * 3)].innerHTML

            let column = columnParseInt(totalOne, totalTwo, totalThree, totalFour)

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            for (let j = 0; j < 4; j++)
            {
                squares[i + (width * j)].innerHTML = newColumn[j]
            }
        }
    }

    function combineRow()
    {
        for (let i = 0; i < 15; i++)
        {
            if (i % 4 === 3) continue;
            if (squares[i].innerHTML === squares[i + 1].innerHTML)
            {
                score += parseInt(squares[i].innerHTML)
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i + 1].innerHTML = 0;
            }
        }
        checkForWin();
    }
    function combineColumn()
    {
        for (let i = 0; i < 12; i++)
        {
            if (squares[i].innerHTML === squares[i + width].innerHTML)
            {
                score += parseInt(squares[i].innerHTML)
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i + width].innerHTML = 0
            }
            
        }checkForWin();
    }

    console.log("score:", score)
    

    function control(e)
    {
        if (e.keyCode === 39) keyRight()
        else if (e.keyCode === 37) keyLeft()
        else if (e.keyCode === 38) keyUp()
        else if (e.keyCode === 40) keyDown()
    }

    document.addEventListener('keyup', control)

    function keyRight()
    {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft()
    {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyUp()
    {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function keyDown()
    {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    function checkForWin()
    {
        for (let i = 0; i < squares.length; i++)
        {
            if (squares[i].innerHTML == 2048)
            {
                resultDisplay.innerHTML = "YouWin!!!!!";
                document.removeEventListener("keyup", control)
            }
        }
    }
    function checkForLose()
    {
        let zero = 0
        for (let i = 0; i < 16; i++)
        {
            if (squares[i].innerHTML == 0) zero++
        }
        if (zero == 0) {
            resultDisplay.innerHTML = "You Lose......"
            document.removeEventListener("keyup", control)
        }
    }
})

function darkDisplay()
{
    document.body.style.color = "#ABCDEF";
    document.body.style.backgroundColor = "#333333";

}

function normalDisplay()
{
    document.body.style.color = "#333333";
    document.body.style.backgroundColor = "#FFFFFF";
}


function columnParseInt(one, two, three, four)
{
    let column;
    return column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]
}


function qs(id){
    return document.querySelector(id);
}

function id(id){
    return document.getElementById(id);
}

