const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o Sqlite bem-sucedida!');
  } catch (error) {
    console.error('Não foi possível conectar ao Sqlite:', error);
  }
}

testConnection();

(async () => {await sequelize.sync();})();


module.exports = sequelize;

