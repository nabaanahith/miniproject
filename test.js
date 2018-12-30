mandatory = () => {
    throw new Error('Missing parameter!');
  }
  
  foo = (bar = mandatory('r')) => {
      console.log(bar);
      
    return bar;
  }