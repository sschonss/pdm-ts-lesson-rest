/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "a50i2hb9ja35ncx",
    "created": "2024-06-05 19:14:32.289Z",
    "updated": "2024-06-05 19:14:32.289Z",
    "name": "cars",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5ubgvug0",
        "name": "model",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "bsesvsha",
        "name": "brand",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "z4hxgckj",
        "name": "hp",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("a50i2hb9ja35ncx");

  return dao.deleteCollection(collection);
})
