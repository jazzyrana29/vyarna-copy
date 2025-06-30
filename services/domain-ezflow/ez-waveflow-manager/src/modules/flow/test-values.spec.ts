import {
  CreateFlowDto,
  DeleteFlowDto,
  GetOneFlowDto,
  GetZtrackingFlowDto,
  UpdateFlowDto,
} from 'ez-utils';
import { Flow } from '../../entities/flow.entity';
import { ZtrackingFlow } from '../../entities/ztracking-flow.entity';
import { mockWaveCase001 } from '../waves/test-values.spec';
import { mockFlowIsActiveForWaveTypeAndBusinessUnitCase001 } from '../flow-is-active-for-wave-type-and-business-unit/test-values.spec';
import { mockNodeCase001 } from '../node/test-values.spec';
import {
  mockWaveTypeCase001,
  mockWaveTypeId,
} from '../wave-type/test-values.spec';

export const mockTraceIdForFlow: string = 'traceIdForMockFlow';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockFlowId: string = 'mockFlowId';

// Mock for first case
export const mockFlowName001: string = 'mockFlowName001';
export const mockFlowDescription001: string = 'mockFlowDescription001';

export const mockFlowCase001: Flow = {
  flowId: mockFlowId,
  name: mockFlowName001,
  description: mockFlowDescription001,
  waves: [mockWaveCase001],
  flowIsActiveForWaveTypeAndBusinessUnits: [
    mockFlowIsActiveForWaveTypeAndBusinessUnitCase001,
  ],
  nodes: [mockNodeCase001],
  waveType: mockWaveTypeCase001,
  waveTypeId: mockWaveTypeId,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<Flow> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<Flow> {
    return Promise.resolve(undefined);
  },
  save(): Promise<Flow> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<Flow> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
  businessUnitId: '',
  isPublished: false
};

export const mockFlowName002: string = 'mockFlowName002';
export const mockFlowDescription002: string = 'mockFlowDescription002';

// Mock for second case
export const mockFlowCase002: Flow = {
  flowId: mockFlowId,
  name: mockFlowName002,
  description: mockFlowDescription002,
  waves: [mockWaveCase001],
  flowIsActiveForWaveTypeAndBusinessUnits: [
    mockFlowIsActiveForWaveTypeAndBusinessUnitCase001,
  ],
  nodes: [mockNodeCase001],
  waveType: mockWaveTypeCase001,
  waveTypeId: mockWaveTypeId,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<Flow> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<Flow> {
    return Promise.resolve(undefined);
  },
  save(): Promise<Flow> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<Flow> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
  businessUnitId: '',
  isPublished: false
};

// Mock for ztracking flow
export const mockZtrackingFlowCase001: ZtrackingFlow = {
  ztrackingVersion: 'mock-version-uuid',
  flowId: mockFlowId,
  name: mockFlowName001,
  description: mockFlowDescription001,
  waveTypeId: mockWaveTypeId,
  isDeleted: false,
  updatedBy: mockUser001,
  versionDate: commonCreationDate,

  // Mock the BaseEntity methods
  recover(): Promise<ZtrackingFlow> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<ZtrackingFlow> {
    return Promise.resolve(undefined);
  },
  save(): Promise<ZtrackingFlow> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<ZtrackingFlow> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
  businessUnitId: '',
  isPublished: false
};

export const mockCreateFlowDto: CreateFlowDto = {
  name: mockFlowName001,
  description: mockFlowDescription001,
  waveTypeId: mockWaveTypeId,
  isPublished: false
};

export const mockUpdateFlowDto: UpdateFlowDto = {
  name: mockFlowName002,
  description: mockFlowDescription002,
  waveTypeId: mockWaveTypeId,
  flowId: ''
};

export const mockGetOneFlowDto: GetOneFlowDto = {
  flowId: mockFlowId,
  name: mockFlowName001,
  isDeleted: false,
};

export const mockDeleteFlowDto: DeleteFlowDto = {
  flowId: mockFlowId,
  updatedBy: mockUser001,
};

export const mockGetZtrackingFlowDto: GetZtrackingFlowDto = {
  flowId: mockFlowId,
};
