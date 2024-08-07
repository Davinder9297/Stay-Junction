const fs = require('fs');
const appRoot = require('app-root-path');
const Room = require('../models/room.model');
const Hostels=require('../models/hostel.model')
const logger = require('../middleware/winston.logger');
const { errorResponse, successResponse } = require('../configs/app.response');
const MyQueryHelper = require('../configs/api.feature');

// TODO: Controller for create new room
exports.createRoom = async (req, res) => {
  try {
    const {
      room_name,room_distance,room_location,room_city,room_slug, room_type, room_price, room_size, room_capacity, allow_pets, provide_breakfast, featured_room, room_description, extra_facilities
    } = req.body;

    // check `room_name` filed exits
    if (!room_name) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_name` filed is required'
      ));
    }

    // check `room_slug` filed exits
    if (!room_slug) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_slug` filed is required'
      ));
    }

    // check `room_type` filed exits

    // check `room_price` filed exits
    if (!room_price) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_price` filed is required'
      ));
    }

    // check `room_size` filed exits
    if (!room_size) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_size` filed is required'
      ));
    }

    // check `room_capacity` filed exits
    if (!room_capacity) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_capacity` filed is required'
      ));
    }

    // check `room_description` filed exits
    if (!room_description) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_description` filed is required'
      ));
    }
    if (!room_distance) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_distance` filed is required'
      ));
    }

    // check `extra_facilities[0]` filed exits
    if (!extra_facilities[0]) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'Minimum 1 `extra_facilities` filed is required'
      ));
    }

    // check `req.files[0]` filed exits
    if (!req.files[0]) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'Minimum 1 `room_images` filed is required '
      ));
    }

    // check `room_name` already exist in database
    const roomName = await Room.findOne({ room_name });
    if (roomName) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(409).json(errorResponse(
        9,
        'ALREADY EXIST',
        'Sorry, `room_name` already exists'
      ));
    }

    // check `room_slug` already exist in database
    const roomSlug = await Room.findOne({ room_slug });
    if (roomSlug) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(409).json(errorResponse(
        9,
        'ALREADY EXIST',
        'Sorry, `room_slug` already exists'
      ));
    }

    // prepared user input room data to store database
    const data = {
      room_name,
      room_slug,
      room_city,
      room_distance,
      room_type,
      room_location,
      room_price,
      room_size,
      room_capacity,
      allow_pets,
      provide_breakfast,
      featured_room,
      room_description,
      extra_facilities,
      room_images: req?.files?.map((file) => ({ url: `/uploads/rooms/${file.filename}` })),
      created_by: req.user.id
    };

    // save room data in database
    const room = await Room.create(data);

    // success response with register new user
    res.status(201).json(successResponse(
      0,
      'SUCCESS',
      'New room create successful',
      room
    ));
  } catch (error) {
    for (const element of req.files) {
      fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
        if (err) { logger.error(err); }
      });
    }

    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
exports.createHostel = async (req, res) => {
  // console.log("yes");
  try {
    const {
      hostel_name,hostel_distance, hostel_slug, hostel_price, hostel_size, hostel_room, provide_breakfast, provide_lunch, provide_dinner, hostel_location,mess, featured_hostel, extra_facilities,hostel_description,hostel_images,hostel_status
    } = req.body;
    // console.log(req.body);
    
    if (!hostel_name) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_name` filed is required'
      ));
    }

    // check `room_slug` filed exits
    if (!hostel_slug) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_slug` filed is required'
      ));
    }

    // check `room_price` filed exits
    if (!hostel_price) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_price` filed is required'
      ));
    }

    // check `room_size` filed exits
    if (!hostel_size) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_size` filed is required'
      ));
    }
    if (!hostel_distance) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_distance` filed is required'
      ));
    }

    // check `room_description` filed exits
    if (!hostel_description) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_description` filed is required'
      ));
    }

    // check `extra_facilities[0]` filed exits
    if (!extra_facilities[0]) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'Minimum 1 `extra_facilities` filed is required'
      ));
    }

    // check `req.files[0]` filed exits
    if (!req.files[0]) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'Minimum 1 `hostel_images` filed is required '
      ));
    }
    // check `room_name` already exist in database
    const roomName = await Hostels.findOne({ hostel_name });
    if (roomName) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(409).json(errorResponse(
        9,
        'ALREADY EXIST',
        'Sorry, `hostel_name` already exists'
      ));
    }

    // check `room_slug` already exist in database
    const roomSlug = await Hostels.findOne({ hostel_slug });
    if (roomSlug) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(409).json(errorResponse(
        9,
        'ALREADY EXIST',
        'Sorry, `hostel_slug` already exists'
      ));
    }

    // prepared user input room data to store database
    const data = {
      hostel_name,hostel_distance, hostel_slug, hostel_price, hostel_size, hostel_room, provide_breakfast, provide_lunch, provide_dinner, hostel_location,mess, featured_hostel, extra_facilities,hostel_description,
hostel_images: req?.files?.map((file) => ({ url: `/uploads/rooms/${file.filename}` })),
      created_by: req.user.id
    };

    // save room data in database
    const room = await Hostels.create(data);

    // success response with register new user
    res.status(201).json(successResponse(
      0,
      'SUCCESS',
      'New hostel create successful',
      room
    ));
  } catch (error) {
    for (const element of req.files) {
      fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
        if (err) { logger.error(err); }
      });
    }

    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for get all rooms list
exports.getRoomsList = async (req, res) => {
  try {
    // finding all room data from database
    const rooms = await Room.find();

    // filtering rooms based on different types query
    const roomQuery = new MyQueryHelper(Room.find(), req.query).search('room_name').sort().paginate();
    const findRooms = await roomQuery.query;

    const mappedRooms = findRooms?.map((data) => ({
      id: data._id,
      room_name: data.room_name,
      room_distance:data.room_distance,
      room_city:data.room_city,
      room_slug: data.room_slug,
      room_location:data.room_location,
      room_type: data.room_type,
      room_price: data.room_price,
      room_size: data.room_size,
      room_capacity: data.room_capacity,
      allow_pets: data.allow_pets,
      provide_breakfast: data.provide_breakfast,
      featured_room: data.featured_room,
      room_description: data.room_description,
      room_status: data.room_status,
      extra_facilities: data.extra_facilities,
      room_images: data?.room_images?.map(
        (img) => ({ url: process.env.APP_BASE_URL + img.url })
      ),
      created_by: data.created_by,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    }));

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'Rooms list data found successful',
      {
        rows: mappedRooms,
        total_rows: rooms.length,
        response_rows: findRooms.length,
        total_page: req?.query?.keyword ? Math.ceil(findRooms.length / req.query.limit) : Math.ceil(rooms.length / req.query.limit),
        current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
exports.getRoomsListbycity = async (req, res) => {
  try {
    // finding all room data from database
    const rooms = await Room.find();

    // filtering rooms based on different types query
    const roomQuery = new MyQueryHelper(Room.find(), req.query).search('room_city').sort().paginate();
    const findRooms = await roomQuery.query;

    const mappedRooms = findRooms?.map((data) => ({
      id: data._id,
      room_name: data.room_name,
      room_distance:data.room_distance,
      room_city:data.room_city,
      room_slug: data.room_slug,
      room_location:data.room_location,
      room_type: data.room_type,
      room_price: data.room_price,
      room_size: data.room_size,
      room_capacity: data.room_capacity,
      allow_pets: data.allow_pets,
      provide_breakfast: data.provide_breakfast,
      featured_room: data.featured_room,
      room_description: data.room_description,
      room_status: data.room_status,
      extra_facilities: data.extra_facilities,
      room_images: data?.room_images?.map(
        (img) => ({ url: process.env.APP_BASE_URL + img.url })
      ),
      created_by: data.created_by,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    }));

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'Rooms list data found successful',
      {
        rows: mappedRooms,
        total_rows: rooms.length,
        response_rows: findRooms.length,
        total_page: req?.query?.keyword ? Math.ceil(findRooms.length / req.query.limit) : Math.ceil(rooms.length / req.query.limit),
        current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
exports.getHostelsList = async (req, res) => {
  try {
    // finding all room data from database
    const rooms = await Hostels.find();

    // filtering rooms based on different types query
    const roomQuery = new MyQueryHelper(Hostels.find(), req.query).search('hostel_name').sort().paginate();
    const findRooms = await roomQuery.query;

    const mappedRooms = findRooms?.map((data) => ({
      id: data._id,
      hostel_name: data.hostel_name,
      hostel_slug: data.hostel_slug,
      hostel_distance:data.hostel_distance,
      hostel_price: data.hostel_price,
      hostel_size: data.hostel_size,
      hostel_room: data.hostel_room,
      hostel_location: data.hostel_location,
      provide_breakfast: data.provide_breakfast,
      provide_lunch: data.provide_lunch,
      provide_dinner: data.provide_dinner,
      featured_hostel: data.featured_hostel,
      hostel_description: data.hostel_description,
      hostel_status: data.hostel_status,
      mess: data.mess,
      extra_facilities: data.extra_facilities,
      hostel_images: data?.hostel_images?.map(
        (img) => ({ url: process.env.APP_BASE_URL + img.url })
      ),
      created_by: data.created_by,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    }));

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'Hostel list data found successful',
      {
        rows: mappedRooms,
        total_rows: rooms.length,
        response_rows: findRooms.length,
        total_page: req?.query?.keyword ? Math.ceil(findRooms.length / req.query.limit) : Math.ceil(rooms.length / req.query.limit),
        current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
exports.getHostelsListbycity = async (req, res) => {
  try {
    // finding all room data from database
    const rooms = await Hostels.find();

    // filtering rooms based on different types query
    const roomQuery = new MyQueryHelper(Hostels.find(), req.query).search('hostel_location').sort().paginate();
    const findRooms = await roomQuery.query;

    const mappedRooms = findRooms?.map((data) => ({
      id: data._id,
      hostel_name: data.hostel_name,
      hostel_slug: data.hostel_slug,
      hostel_distance: data.hostel_distance,
      hostel_price: data.hostel_price,
      hostel_size: data.hostel_size,
      hostel_room: data.hostel_room,
      hostel_location: data.hostel_location,
      provide_breakfast: data.provide_breakfast,
      provide_lunch: data.provide_lunch,
      provide_dinner: data.provide_dinner,
      featured_hostel: data.featured_hostel,
      hostel_description: data.hostel_description,
      hostel_status: data.hostel_status,
      mess: data.mess,
      extra_facilities: data.extra_facilities,
      hostel_images: data?.hostel_images?.map(
        (img) => ({ url: process.env.APP_BASE_URL + img.url })
      ),
      created_by: data.created_by,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    }));

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'Hostel list data found successful',
      {
        rows: mappedRooms,
        total_rows: rooms.length,
        response_rows: findRooms.length,
        total_page: req?.query?.keyword ? Math.ceil(findRooms.length / req.query.limit) : Math.ceil(rooms.length / req.query.limit),
        current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for find a room by id or room slug_name
exports.getRoomByIdOrSlugName = async (req, res) => {
  try {
    let room = null;

    if (/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      room = await Room.findById(req.params.id).populate('created_by');
    } else {
      room = await Room.findOne({ room_slug: req.params.id }).populate('created_by');
    }

    if (!room) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'Room does not exist'
      ));
    }

    const organizedRoom = {
      id: room?._id,
      room_name: room?.room_name,
      room_city:room?.room_city,
      room_distance:room?.room_distance,
      room_location: room?.room_location,
      room_slug: room?.room_slug,
      room_type: room?.room_type,
      room_price: room?.room_price,
      room_size: room?.room_size,
      room_capacity: room?.room_capacity,
      allow_pets: room?.allow_pets,
      provide_breakfast: room?.provide_breakfast,
      featured_room: room?.featured_room,
      room_description: room?.room_description,
      room_status: room?.room_status,
      extra_facilities: room?.extra_facilities,
      room_images: room?.room_images?.map(
        (img) => ({ url: process.env.APP_BASE_URL + img.url })
      ),
      created_by: {
        id: room?.created_by._id,
        userName: room?.created_by.userName,
        fullName: room?.created_by.fullName,
        email: room?.created_by.email,
        phone: room?.created_by.phone,
        avatar: process.env.APP_BASE_URL + room?.created_by.avatar,
        gender: room?.created_by.gender,
        dob: room?.created_by.dob,
        address: room?.created_by.address,
        role: room?.created_by.role,
        verified: room?.created_by.verified,
        status: room?.created_by.status,
        createdAt: room?.created_by.createdAt,
        updatedAt: room?.created_by.updatedAt
      },
      created_at: room?.createdAt,
      updated_at: room?.updatedAt
    };

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'User information get successful',
      organizedRoom
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
exports.getHostelByIdOrSlugName = async (req, res) => {
  try {
    let room = null;

    if (/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      room = await Hostels.findById(req.params.id).populate('created_by');
    } else {
      room = await Hostels.findOne({ hostel_slug: req.params.id }).populate('created_by');
    }
    if (!room) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'Hostel does not exist'
      ));
    }

    const organizedRoom = {
      id: room?._id,
      hostel_name: room?.hostel_name,
      hostel_slug: room?.hostel_slug,
      hostel_price: room?.hostel_price,
      hostel_distance: room?.hostel_distance,
      hostel_size: room?.hostel_size,
      hostel_room: room?.hostel_room,
      hostel_location: room?.hostel_location,
      provide_breakfast: room?.provide_breakfast,
      provide_lunch: room?.provide_lunch,
      provide_dinner: room?.provide_dinner,
      featured_hostel: room?.featured_hostel,
      hostel_description: room?.hostel_description,
      hostel_status: room?.hostel_status,
      mess: room?.mess,
      extra_facilities: room?.extra_facilities,
      hostel_images: room?.hostel_images?.map(
        (img) => ({ url: process.env.APP_BASE_URL + img.url })
      ),
      created_by: {
        id: room?.created_by._id,
        userName: room?.created_by.userName,
        fullName: room?.created_by.fullName,
        email: room?.created_by.email,
        phone: room?.created_by.phone,
        avatar: process.env.APP_BASE_URL + room?.created_by.avatar,
        gender: room?.created_by.gender,
        dob: room?.created_by.dob,
        address: room?.created_by.address,
        role: room?.created_by.role,
        verified: room?.created_by.verified,
        status: room?.created_by.status,
        createdAt: room?.created_by.createdAt,
        updatedAt: room?.created_by.updatedAt
      },
      created_at: room?.createdAt,
      updated_at: room?.updatedAt
    };

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'User information get successful',
      organizedRoom
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for edit room
exports.editRoomByAdmin = async (req, res) => {
  try {
    const {
      room_name,room_distance,room_location,room_city, room_slug, room_type, room_price, room_size, room_capacity, allow_pets, provide_breakfast, featured_room, room_description, extra_facilities
    } = req.body;

    // check `room_name` filed exits
    if (!room_name) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_name` filed is required '
      ));
    }

    // check `room_slug` filed exits
    if (!room_slug) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_slug` filed is required '
      ));
    }

    // check `room_type` filed exits

    // check `room_price` filed exits
    if (!room_price) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_price` filed is required '
      ));
    }

    // check `room_size` filed exits
    if (!room_size) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_size` filed is required '
      ));
    }

    // check `room_capacity` filed exits
    if (!room_capacity) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_capacity` filed is required '
      ));
    }

    // check `room_description` filed exits
    if (!room_description) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_description` filed is required '
      ));
    }

    // check `extra_facilities[0]` filed exits
    if (!extra_facilities[0]) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'Minimum 1 `extra_facilities` filed is required '
      ));
    }

    // check `req.files[0]` filed exits
    if (!req.files[0]) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'Minimum 1 `room_images` filed is required '
      ));
    }

    // finding by room by room id
    let room = null;

    if (/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      room = await Room.findById(req.params.id);
    }

    if (!room) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'Room does not exist'
      ));
    }

    // delete room old images
    (() => {
      for (const element of room.room_images) {
        fs.unlink(`${appRoot}/public/${element.url}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
    })();

    // update room info & save database
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        room_name,
        room_slug,
        room_distance,
        room_city,
        room_location,
        room_type,
        room_price,
        room_size,
        room_capacity,
        allow_pets,
        provide_breakfast,
        featured_room,
        room_description,
        extra_facilities,
        room_images: req?.files?.map(
          (file) => ({ url: `/uploads/rooms/${file.filename}` })
        ),
        updatedAt: Date.now()
      },
      { runValidators: true, new: true }
    );

    // success response with register new user
    res.status(201).json(successResponse(
      0,
      'SUCCESS',
      'New room updated successful',
      updatedRoom
    ));
  } catch (error) {
    for (const element of req.files) {
      fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
        if (err) { logger.error(err); }
      });
    }

    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
exports.editHostelByAdmin = async (req, res) => {
  try {
    const {
      hostel_name,hostel_distance, hostel_slug, hostel_price, hostel_size, hostel_room, provide_breakfast, provide_lunch, provide_dinner, hostel_location,mess, featured_hostel, extra_facilities,hostel_description,hostel_images,hostel_status
    } = req.body;

    // check `room_name` filed exits
    if (!hostel_name) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_name` filed is required '
      ));
    }

    // check `room_slug` filed exits
    if (!hostel_slug) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`room_slug` filed is required '
      ));
    }

    // check `room_type` filed exits
    if (!hostel_room) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_room` filed is required '
      ));
    }

    // check `room_price` filed exits
    if (!hostel_price) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_price` filed is required '
      ));
    }

    // check `room_size` filed exits
    if (!hostel_size) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_size` filed is required '
      ));
    }


    // check `room_description` filed exits
    if (!hostel_description) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        '`hostel_description` filed is required '
      ));
    }

    // check `extra_facilities[0]` filed exits
    if (!extra_facilities[0]) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'Minimum 1 `extra_facilities` filed is required '
      ));
    }
    // check `req.files[0]` filed exits
    if (!req.files[0]) {
      for (const element of req.files) {
        fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'Minimum 1 `hostel_images` filed is required '
      ));
    }

    // finding by room by room id
    let room = null;

    if (/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      room = await Hostels.findById(req.params.id);
    }

    if (!room) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'Hostel does not exist'
      ));
    }

    // delete room old images
    (() => {
      for (const element of room.hostel_images) {
        fs.unlink(`${appRoot}/public/${element.url}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
    })();

    // update room info & save database
    const updatedRoom = await Hostels.findByIdAndUpdate(
      req.params.id,
      {
        hostel_name,
         hostel_slug,
          hostel_price,
          hostel_distance,
           hostel_size, 
           hostel_room, 
           provide_breakfast, 
           provide_lunch, 
           provide_dinner, 
           hostel_location,
           mess, 
           featured_hostel,
            extra_facilities,
            hostel_description,
        hostel_images: req?.files?.map(
          (file) => ({ url: `/uploads/rooms/${file.filename}` })
        ),
        updatedAt: Date.now()
      },
      { runValidators: true, new: true }
    );

    // success response with register new user
    res.status(201).json(successResponse(
      0,
      'SUCCESS',
      'New hostel updated successful',
      updatedRoom
    ));
  } catch (error) {
    for (const element of req.files) {
      fs.unlink(`${appRoot}/public/uploads/rooms/${element.filename}`, (err) => {
        if (err) { logger.error(err); }
      });
    }

    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for delete room using ID by admin
exports.deleteRoomById = async (req, res) => {
  try {
    // check if room exists
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'Room does not exist'
      ));
    }

    // delete room form database
    await Room.findByIdAndDelete(room.id);

    // delete old images
    (() => {
      for (const element of room.room_images) {
        fs.unlink(`${appRoot}/public/${element.url}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
    })();

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'Room delete form database successful'
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
exports.deleteHostelById = async (req, res) => {
  try {
    // check if room exists
    const room = await Hostels.findById(req.params.id);

    if (!room) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'Hostel does not exist'
      ));
    }

    // delete room form database
    await Hostels.findByIdAndDelete(room.id);

    // delete old images
    (() => {
      for (const element of room.hostel_images) {
        fs.unlink(`${appRoot}/public/${element.url}`, (err) => {
          if (err) { logger.error(err); }
        });
      }
    })();

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'Hostel delete form database successful'
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for get featured rooms list
exports.getFeaturedRoomsList = async (req, res) => {
  try {
    // finding featured room data from database
    const rooms = await Room.find({ featured_room: true });

    // filtering rooms based on different types query
    const roomQuery = new MyQueryHelper(Room.find(
      { featured_room: true }
    ), req.query).search('room_name').sort().paginate();
    const findRooms = await roomQuery.query;

    const mappedRooms = findRooms?.map((data) => ({
      id: data._id,
      room_name: data.room_name,
      room_distance: data.room_distance,
      room_city:data.room_city,
      room_slug: data.room_slug,
      room_location: data.room_location,
      room_type: data.room_type,
      room_price: data.room_price,
      room_size: data.room_size,
      room_capacity: data.room_capacity,
      allow_pets: data.allow_pets,
      provide_breakfast: data.provide_breakfast,
      featured_room: data.featured_room,
      room_description: data.room_description,
      room_status: data.room_status,
      extra_facilities: data.extra_facilities,
      room_images: data?.room_images?.map(
        (img) => ({ url: process.env.APP_BASE_URL + img.url })
      ),
      created_by: data.created_by,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    }));

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'Featured rooms list data found successful',
      {
        rows: mappedRooms,
        total_rows: rooms.length,
        response_rows: findRooms.length,
        total_page: req?.query?.keyword ? Math.ceil(findRooms.length / req.query.limit) : Math.ceil(rooms.length / req.query.limit),
        current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
exports.getFeaturedHostelList = async (req, res) => {
  try {
    // finding featured room data from database
    const rooms = await Hostels.find({ featured_hostel: true });

    // filtering rooms based on different types query
    const roomQuery = new MyQueryHelper(Hostels.find(
      { featured_hostel: true }
    ), req.query).search('hostel_name').sort().paginate();
    const findRooms = await roomQuery.query;

    const mappedRooms = findRooms?.map((data) => ({
      id: data._id,
      hostel_name: data.hostel_name,
      hostel_distance: data.hostel_distance,
      hostel_slug: data.hostel_slug,
      hostel_price: data.hostel_price,
      hostel_size: data.hostel_size,
      hostel_room: data.hostel_room,
      hostel_location: data.hostel_location,
      provide_breakfast: data.provide_breakfast,
      provide_lunch: data.provide_lunch,
      provide_dinner: data.provide_dinner,
      featured_hostel: data.featured_hostel,
      hostel_description: data.hostel_description,
      hostel_status: data.hostel_status,
      mess: data.mess,
      extra_facilities: data.extra_facilities,
      hostel_images: data?.hostel_images?.map(
        (img) => ({ url: process.env.APP_BASE_URL + img.url })
      ),
      created_by: data.created_by,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    }));

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'Featured rooms list data found successful',
      {
        rows: mappedRooms,
        total_rows: rooms.length,
        response_rows: findRooms.length,
        total_page: req?.query?.keyword ? Math.ceil(findRooms.length / req.query.limit) : Math.ceil(rooms.length / req.query.limit),
        current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
