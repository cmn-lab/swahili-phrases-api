const prisma = require("../prisma/index");
const { validationResult } = require("express-validator");
const hashids = require("../hashes/hashIds");

exports.createTag = async (req, res, next) => {
  // Check for errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    // Create new tag
    try {
      const { name } = req.body;
      const data = { name };
      const result = await prisma.tag.create({ data });
      console.log(result);
      result &&
        res
          .status(200)
          .json({ message: "SUCCESS", resultCode: 0, result: result });
    } catch (error) {
      next(error);
    }
  }
};

exports.getTags = async (req, res, next) => {
  try {
    // Check Filters in the request
    const params = req.query;

    if (Object.keys(params).length === 0 && params.constructor === Object) {
      // No params, Get All Tags
      const result = await prisma.tag.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      if (!result) {
        res.status(404).json({ errorCode: 1020, message: "Tags not found" });
      } else {
        let formattedResult = [];

        // Format result
        result.forEach((element) => {
          const hashedId = hashids.encode(element.id);
          const formattedObject = {
            id: hashedId,
            name: element.name,
          };
          formattedResult.push(formattedObject);
        });
        res.status(200).json(formattedResult);
      }
    } else {
      // Params Exist, Get Filter Tags
      const { query } = params;
      const queryTags = JSON.parse(query);

      try {
        const result = await prisma.tag.findMany({
          where: {
            OR: [
              {
                name: {
                  equals: queryTags.tags[0],
                },
              },
              {
                name: {
                  equals: queryTags.tags[1],
                },
              },
            ],
          },
          select: {
            id: true,
            name: true,
          },
        });

        if (!result) {
          res.status(404).json({ errorCode: 1020, message: "Tags not found" });
        } else {
          let formattedResult = [];

          // Format result
          result.forEach((element) => {
            const hashedId = hashids.encode(element.id);
            const formattedObject = {
              id: hashedId,
              name: element.name,
            };
            formattedResult.push(formattedObject);
          });
          res.status(200).json(formattedResult);
        }
      } catch (error) {
        res.status(404).json({ errorCode: 1020, message: "Tags not found" });
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};
