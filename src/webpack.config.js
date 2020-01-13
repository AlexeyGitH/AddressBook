const path = require('path');

module.exports = {

  //  entry: path.join(__dirname, '/client/src/app.jsx'),
  
    entry: {
      AddressBook:    ['babel-polyfill', path.join(__dirname, '/client/src/AddressBook/AddressBook.jsx')],
      Admin:          ['babel-polyfill', path.join(__dirname, '/client/src/Admin/Admin.jsx')],
      DashBoardAdmin: ['babel-polyfill', path.join(__dirname, '/client/src/Admin/Dashboards_admin.jsx')]
    },
    // the bundle file we will get in the result

    //output: {
    //  path: path.join(__dirname, '/client/dist/js'),
    //  filename: 'app.js',
    //},

    output: {
      filename: '[name].js',
      path: path.join(__dirname, '/client/dist/js')
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    mode: 'development',   
  };