module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'rarwe-demo',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
