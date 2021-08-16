module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('fotos2', 'originalName', 'originalname'),
    await queryInterface.renameColumn('fotos2', 'fileName', 'filename');
  },
  down: async () => {},
};
