const obj = {
    fn: function(){
      console.log(this)
    }
  }
obj.fn();  // obj
const func = obj.fn;
func();  //window