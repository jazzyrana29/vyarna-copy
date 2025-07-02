import { ResponseDTO } from '../../../dto/response.dto';
import {
  CreateOperatorDto,
  GetOperatorDto,
  OperatorDto,
  UpdateOperatorDto,
} from 'ez-utils';

export const mockTraceId: string = 'traceIdForMockCreateBusiness';
export const commonUseCreationDate: Date = new Date();
export const mockOperatorId001: string = 'uuidForMockCreateOperatorDtoCase001';
export const mockOperatorUsername001: string = 'nameForMyOperatorCase001';
export const mockOperatorNameFirst001: string = 'nameFirstForMyOperatorCase001';
export const mockOperatorNameLast001: string = 'nameLastForMyOperatorCase001';
export const mockOperatorEmail001: string = 'email@ForMyOperatorCase001.com';
export const mockOperatorUsername002: string = 'nameForMyOperatorCase002';
export const mockOperatorNameFirst002: string = 'nameFirstForMyOperatorCase002';
export const mockOperatorNameLast002: string = 'nameLastForMyOperatorCase002';
export const mockOperatorEmail002: string = 'email@ForMyOperatorCase002.com';
export const mockUser001: string = 'userForMyOperatorCase001';
export const mockZtrackingVersion001: string =
  'uuidForMockZtrackingVersionCase001';

export const mockCreateOperatorDtoCase001: CreateOperatorDto = {
  username: mockOperatorUsername001,
  nameFirst: mockOperatorNameFirst001,
  nameLast: mockOperatorNameLast001,
  email: mockOperatorEmail001,
  businessUnitId: '',
  rootBusinessUnitId: '',
  nameMiddle: '',
  password: '',
};
export const mockResponseCreateOperatorDtoCase001: ResponseDTO<CreateOperatorDto> =
  {
    statusCode: 200,
    data: mockCreateOperatorDtoCase001,
    message: 'success',
  };

export const mockGetOperatorDtoCase001: GetOperatorDto = {
  operatorId: mockOperatorId001,
  nameFirst: mockOperatorNameFirst001,
  isDeleted: false,
};

export const mockUpdateOperatorDtoCase002: UpdateOperatorDto = {
  businessUnitId: mockOperatorId001,
  username: mockOperatorUsername002,
  nameFirst: mockOperatorNameFirst002,
  nameLast: mockOperatorNameLast002,
  email: mockOperatorEmail002,
  isDeleted: false,
  updatedBy: mockUser001,
  operatorId: '',
  rootBusinessUnitId: '',
  nameMiddle: '',
  password: '',
};

export const mockSavedOperatorCase001: OperatorDto = {
  businessUnitId: mockOperatorId001,
  username: mockOperatorUsername001,
  nameFirst: mockOperatorNameFirst001,
  nameLast: mockOperatorNameLast001,
  email: mockOperatorEmail001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  operatorId: '',
  rootBusinessUnitId: '',
  nameMiddle: '',
  password: '',
};

export const mockResponseOperatorDtoCase001: ResponseDTO<OperatorDto> = {
  statusCode: 200,
  data: mockSavedOperatorCase001,
  message: 'success',
};

export const mockResponseHistoryOperatorDtoCase001: ResponseDTO<OperatorDto[]> =
  {
    statusCode: 200,
    data: [mockSavedOperatorCase001],
    message: 'success',
  };
