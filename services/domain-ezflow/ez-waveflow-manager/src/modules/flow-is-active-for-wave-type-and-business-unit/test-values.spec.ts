import {
  CreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
  DeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
  GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
  GetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
  UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
} from 'ez-utils';
import { FlowIsActiveForWaveTypeAndBusinessUnit } from '../../entities/flow-is-active-for-wave-type-and-business-unit.entity';
import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit } from '../../entities/ztracking-flow-is-active-for-wave-type-and-business-unit.entity';
import {
  mockWaveTypeCase001,
  mockWaveTypeId,
} from '../wave-type/test-values.spec';
import { mockFlowCase001, mockFlowId } from '../flow/test-values.spec';

export const mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit: string =
  'traceIdForMockFlowIsActiveForWaveTypeAndBusinessUnit';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockFlowIsActiveForWaveTypeAndBusinessUnitId: string =
  'mockFlowIsActiveForWaveTypeAndBusinessUnitId';

// Mock for first case
export const mockBusinessUnitId001: string = 'mockBusinessUnitId001';

export const mockFlowIsActiveForWaveTypeAndBusinessUnitCase001: FlowIsActiveForWaveTypeAndBusinessUnit =
  {
    waveTypeId: mockWaveTypeId,
    activeFlow: mockFlowCase001,
    waveType: mockWaveTypeCase001,
    businessUnitId: mockBusinessUnitId001,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<FlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<FlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<FlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<FlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

export const mockBusinessUnitId002: string = 'mockBusinessUnitId002';

// Mock for second case
export const mockFlowIsActiveForWaveTypeAndBusinessUnitCase002: FlowIsActiveForWaveTypeAndBusinessUnit =
  {
    waveTypeId: mockWaveTypeId,
    activeFlow: mockFlowCase001,
    waveType: mockWaveTypeCase001,
    businessUnitId: mockBusinessUnitId002,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<FlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<FlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<FlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<FlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

// Mock for ztracking Flow-Is-Active-For-Wave-Type-And-Business-Unit
export const mockZtrackingFlowIsActiveForWaveTypeAndBusinessUnitCase001: ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit =
  {
    ztrackingVersion: 'mock-version-uuid',
    waveTypeId: mockWaveTypeId,
    businessUnitId: mockBusinessUnitId001,
    flowId: mockFlowId,
    id: mockFlowId + mockBusinessUnitId001,
    isDeleted: false,
    updatedBy: mockUser001,
    versionDate: commonCreationDate,

    // Mock the BaseEntity methods
    recover(): Promise<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit> {
      return Promise.resolve(undefined);
    },
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

export const mockCreateFlowIsActiveForWaveTypeAndBusinessUnitDto: CreateFlowIsActiveForWaveTypeAndBusinessUnitDto =
  {
    waveTypeId: mockWaveTypeId,
    activeFlow: mockFlowCase001,
    waveType: mockWaveTypeCase001,
    businessUnitId: mockBusinessUnitId001,
    updatedBy: mockUser001,
  };

export const mockUpdateFlowIsActiveForWaveTypeAndBusinessUnitDto: UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto =
  {
    waveTypeId: mockWaveTypeId,
    activeFlow: mockFlowCase001,
    waveType: mockWaveTypeCase001,
    businessUnitId: mockBusinessUnitId001,
    updatedBy: mockUser001,
  };

export const mockGetOneFlowIsActiveForWaveTypeAndBusinessUnitDto: GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto =
  {
    waveTypeId: mockWaveTypeId,
    businessUnitId: mockBusinessUnitId001,
    isDeleted: false,
  };

export const mockDeleteFlowIsActiveForWaveTypeAndBusinessUnitDto: DeleteFlowIsActiveForWaveTypeAndBusinessUnitDto =
  {
    waveTypeId: mockWaveTypeId,
    businessUnitId: mockBusinessUnitId001,
    updatedBy: mockUser001,
  };

export const mockGetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto: GetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto =
  {
    waveTypeId: mockWaveTypeId,
    businessUnitId: mockBusinessUnitId001,
  };
