    // https://codepen.io/riazxrazor/pen/Gjomdp
    var canvas = document.getElementById( 'canvas' ),
		ctx = canvas.getContext( '2d' ),
    canvas2 = document.getElementById( 'canvas2' ),
    ctx2 = canvas2.getContext( '2d' ),
		// full screen dimensions
		cw = window.innerWidth,
		ch = $(document).height(), // larger than window.innerHeight
    charArr = ['a','c','t','g','u'],
    maxCharCount = 300,
    fallingCharArr = [],
    fontSize = 10,
    maxColums = cw/(fontSize);
    canvas.width = canvas2.width = cw;
    canvas.height = canvas2.height = ch;
    var change_letter = 0;


    function randomInt( min, max ) {
    	return Math.floor(Math.random() * ( max - min ) + min);
    }

    function randomFloat( min, max ) {
    	return Math.random() * ( max - min ) + min;
    }

    function Point(x,y)
    {
      this.x = x;
      this.y = y;
    }

    Point.prototype.draw = function(ctx, chance){
      if(chance % 21 == 1){
      this.value = charArr[randomInt(0,charArr.length)].toUpperCase();
      }
      this.speed = randomFloat(1,5);

      ctx2.fillStyle = "rgba(200,200,200,0.10)";
      ctx2.font = fontSize+"px san-serif";
      ctx2.fillText(this.value,this.x,this.y);

        ctx.fillStyle = "#BEBEBE";
        ctx.font = fontSize+"px san-serif";
        ctx.fillText(this.value,this.x,this.y);



        this.y += this.speed;
        if(this.y > ch)
        {
          this.y = randomFloat(-100,0);
          this.speed = randomFloat(2,5);
        }
    }

    for(var i = 0; i < maxColums ; i++) {
      fallingCharArr.push(new Point(i*fontSize,randomFloat(-1000,0)));
    }


    var update = function()
    {

    ctx.fillStyle = "rgba(255,255,255,0.075)"; // trail
    ctx.fillRect(0,0,cw,ch);

    ctx2.clearRect(0,0,cw,ch);

      var i = fallingCharArr.length;

      while (i--) {
        fallingCharArr[i].draw(ctx, change_letter);
        var v = fallingCharArr[i];
        change_letter = ++change_letter % 19 // keep from changing too often
      }

      requestAnimationFrame(update);
    }

  update();
