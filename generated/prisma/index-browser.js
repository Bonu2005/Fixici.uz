
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRU: 'nameRU',
  nameEng: 'nameEng'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRU: 'nameRU',
  nameEng: 'nameEng'
};

exports.Prisma.CapacityScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRU: 'nameRU',
  nameEng: 'nameEng'
};

exports.Prisma.SizeScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRU: 'nameRU',
  nameEng: 'nameEng'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  fullName: 'fullName',
  password: 'password',
  phoneNumber: 'phoneNumber',
  regionId: 'regionId',
  IIN: 'IIN',
  MFO: 'MFO',
  RS: 'RS',
  Bank: 'Bank',
  OKED: 'OKED',
  ADDRESS: 'ADDRESS',
  role: 'role',
  status: 'status'
};

exports.Prisma.ToolsScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRU: 'nameRU',
  nameEng: 'nameEng',
  descriptionUz: 'descriptionUz',
  descriptionRU: 'descriptionRU',
  descriptionEng: 'descriptionEng',
  price: 'price',
  quantity: 'quantity',
  code: 'code',
  image: 'image',
  brandId: 'brandId',
  isActive: 'isActive',
  capacityId: 'capacityId',
  sizeId: 'sizeId'
};

exports.Prisma.MasterScalarFieldEnum = {
  id: 'id',
  fullName: 'fullName',
  phone: 'phone',
  isActive: 'isActive',
  year: 'year',
  image: 'image',
  passportImage: 'passportImage',
  about: 'about'
};

exports.Prisma.MasterProdScalarFieldEnum = {
  id: 'id',
  masterId: 'masterId',
  productId: 'productId',
  minWorkingHour: 'minWorkingHour',
  levelId: 'levelId',
  priceHourly: 'priceHourly',
  priceDaily: 'priceDaily',
  experience: 'experience'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRU: 'nameRU',
  nameEng: 'nameEng',
  image: 'image',
  isActive: 'isActive'
};

exports.Prisma.LevelScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRU: 'nameRU',
  nameEng: 'nameEng'
};

exports.Prisma.ProductLevelsScalarFieldEnum = {
  id: 'id',
  levelId: 'levelId',
  productId: 'productId',
  priceHourly: 'priceHourly',
  priceDaily: 'priceDaily',
  minWorkingHour: 'minWorkingHour'
};

exports.Prisma.ProductToolsScalarFieldEnum = {
  id: 'id',
  toolId: 'toolId',
  productId: 'productId'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  productCount: 'productCount',
  quantity: 'quantity',
  measure: 'measure',
  tool: 'tool',
  total: 'total',
  location: 'location',
  address: 'address',
  date: 'date',
  paymentType: 'paymentType',
  withDelivery: 'withDelivery',
  status: 'status',
  commentToDelivery: 'commentToDelivery',
  userId: 'userId'
};

exports.Prisma.OrderProductsScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  levelId: 'levelId',
  toolId: 'toolId',
  count: 'count',
  price: 'price',
  workingTime: 'workingTime',
  timeUnit: 'timeUnit'
};

exports.Prisma.OrderMastersScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  masterId: 'masterId'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  text: 'text',
  userId: 'userId',
  orderId: 'orderId'
};

exports.Prisma.MasterRatingsScalarFieldEnum = {
  id: 'id',
  star: 'star',
  masterId: 'masterId',
  commentId: 'commentId'
};

exports.Prisma.BasketScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  productCount: 'productCount',
  quantity: 'quantity',
  measure: 'measure',
  toolId: 'toolId',
  total: 'total',
  userId: 'userId',
  timeUnit: 'timeUnit',
  levelId: 'levelId'
};

exports.Prisma.GeneralInfoScalarFieldEnum = {
  id: 'id',
  email: 'email',
  links: 'links',
  phone: 'phone'
};

exports.Prisma.ContactScalarFieldEnum = {
  id: 'id',
  name: 'name',
  surName: 'surName',
  phone: 'phone',
  address: 'address',
  message: 'message'
};

exports.Prisma.FAQScalarFieldEnum = {
  id: 'id',
  question: 'question',
  answer: 'answer'
};

exports.Prisma.ShowCaseScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRU: 'nameRU',
  nameEng: 'nameEng',
  descriptionUz: 'descriptionUz',
  descriptionRU: 'descriptionRU',
  descriptionEng: 'descriptionEng',
  image: 'image',
  link: 'link'
};

exports.Prisma.PartnersScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRU: 'nameRU',
  nameEng: 'nameEng',
  image: 'image'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  ipAddress: 'ipAddress'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.userRole = exports.$Enums.userRole = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  VIEWER_ADMIN: 'VIEWER_ADMIN',
  USER_FIZ: 'USER_FIZ',
  USER_YUR: 'USER_YUR'
};

exports.userStatus = exports.$Enums.userStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  REJECTED: 'REJECTED'
};

exports.paymentType = exports.$Enums.paymentType = {
  CREDIT_CARD: 'CREDIT_CARD',
  CASH: 'CASH',
  BANK_TRANSFER: 'BANK_TRANSFER'
};

exports.orderStatus = exports.$Enums.orderStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  REJECTED: 'REJECTED'
};

exports.MasterDaily = exports.$Enums.MasterDaily = {
  Daily: 'Daily',
  Hoursly: 'Hoursly'
};

exports.Prisma.ModelName = {
  Region: 'Region',
  Brand: 'Brand',
  Capacity: 'Capacity',
  Size: 'Size',
  User: 'User',
  Tools: 'Tools',
  Master: 'Master',
  MasterProd: 'MasterProd',
  Product: 'Product',
  Level: 'Level',
  ProductLevels: 'ProductLevels',
  ProductTools: 'ProductTools',
  Order: 'Order',
  OrderProducts: 'OrderProducts',
  OrderMasters: 'OrderMasters',
  Comment: 'Comment',
  MasterRatings: 'MasterRatings',
  Basket: 'Basket',
  GeneralInfo: 'GeneralInfo',
  Contact: 'Contact',
  FAQ: 'FAQ',
  showCase: 'showCase',
  Partners: 'Partners',
  Session: 'Session'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
