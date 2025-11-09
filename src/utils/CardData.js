import IcnQuarterly from "../assets/svg/rdssSvgs/IcnQuarterly";
import IcnDashboard from "../assets/svg/rdssSvgs/IcnDashboard";
import IcnGuidelines from "../assets/svg/rdssSvgs/IcnGuidelines";
import IcnTpqma from "../assets/svg/rdssSvgs/IcnTpqma";
import IcnImpDocs from "../assets/svg/rdssSvgs/IcnImpDocs";
import IcnScheme from "../assets/svg/rdssSvgs/IcnScheme";
import IcnAction from "../assets/svg/rdssSvgs/IcnAction";
import IcnDocCentre from "../assets/svg/rdssSvgs/IcnDocCentre";
import IcnAudit from "../assets/svg/rdssSvgs/IcnAudit";
import IcnInputForm from "../assets/svg/actionCenterSvgs/IcnInputForm";
import IcnMonitor from "../assets/svg/actionCenterSvgs/IcnMonitor";
import IcnEvalution from "../assets/svg/actionCenterSvgs/IcnEvalution";
import IcnFund from "../assets/svg/actionCenterSvgs/IcnFund";
import IcnCapacity from "./../assets/svg/actionCenterSvgs/IcnCapacity";
import IcnSchemeClosure from "../assets/svg/actionCenterSvgs/IcnSchemeClosure";
import { Images } from "./Images";
import IcnPowerTransformer from "../assets/svg/powerTransformersSvgs/IcnPowerTransformer";
import IcnReport from "../assets/svg/rdssSvgs/IcnReport";
import IcnProgressDetails from "../assets/svg/rdssSvgs/IcnProgressDetails";

const RdssCardData = [
  {
    image: <IcnDashboard />,
    text: "Dashboard",
  },
  {
    image: <IcnGuidelines />,
    text: "Guidelines & SBD",
  },
  {
    image: <IcnImpDocs />,
    text: "Important Documents",
  },
  {
    image: <IcnScheme />,
    text: "Scheme Overview",
  },
  {
    image: <IcnAction />,
    text: "Action Centre",
  },
  {
    image: <IcnTpqma />,
    text: "TPQMA",
  },
  {
    image: <IcnDocCentre />,
    text: "Document Centre",
  },
  {
    image: <IcnAudit />,
    text: "Audit History",
  },
];

const RdssProgressDetailsData = [
  {
    id: 1,
    icon: <IcnQuarterly />,
    text: "Quarterly Targets",
  },
  {
    id: 2,
    icon: <IcnProgressDetails />,
    text: "Progress Details",
  },
  {
    id: 3,
    icon: <IcnReport />,
    text: "Report",
  },
];

const RdssActionCentreCardData = [
  {
    id: 1,
    title: "Input Forms",
    icon: <IcnInputForm />,
  },
  {
    id: 2,
    title: "Monitoring",
    icon: <IcnMonitor />,
  },
  {
    id: 3,
    title: "Evaluation",
    icon: <IcnEvalution />,
  },
  {
    id: 4,
    title: "Fund Disbursal",
    icon: <IcnFund />,
  },
  {
    id: 5,
    title: "Capacity Building",
    icon: <IcnCapacity />,
  },
  {
    id: 6,
    title: "Scheme Closure",
    icon: <IcnSchemeClosure />,
  },
];

const DtrData = [
  {
    id: 1,
    label: "DTR Code",
    input: "",
  },
  {
    id: 2,
    label: "Scheme",
    input: "",
  },
  {
    id: 3,
    label: "LGD Code",
    input: "",
  },
  {
    id: 4,
    label: "State",
    input: "",
  },
  {
    id: 5,
    label: "DISCOM",
    input: "",
  },
  {
    id: 6,
    label: "District",
    input: "",
  },
  {
    id: 7,
    label: "District Census Code",
    input: "",
  },
  {
    id: 8,
    label: "Block",
    input: "",
  },
  {
    id: 9,
    label: "Village Name",
    input: "",
    note: "*(in which DTR is Erected)",
  },
  {
    id: 10,
    label: "Village Census Code",
    input: "",
    note: "*(in which DTR is Erected)",
  },
  {
    id: 11,
    label: "OTR Capacity",
    input: "",
    note: "*(6/15/25/…)",
  },
  {
    id: 12,
    label: "DTR Voltage Ratio",
    input: "",
  },
  {
    id: 13,
    label: "Make Model Of DTR",
    input: "",
  },
  {
    id: 14,
    label: "Manufacturing month and year of DTR",
    input: "",
    type: "calendar",
  },
  {
    id: 15,
    label: "Month/Year of Installation",
    input: "",
    type: "calendar",
  },
  {
    id: 16,
    label: "DTR Mounting",
    input: "",
    note: "*(Single Pole/ Double Pole, Plinth….)",
  },
];
const tabData = [
  {
    id: 1,
    title: "Smart \n Metering",
    selected: false,
  },
  {
    id: 2,
    title: "Loss \n Reduction",
    selected: true,
  },
  {
    id: 3,
    title: "Modernization",
    selected: false,
  },
];
const loseTabData = [
  {
    id: 1,
    title: "General",
    selected: false,
  },
  {
    id: 2,
    title: "Substations",
    selected: true,
  },
  {
    id: 3,
    title: "IT/OT Initiatives \n and SCADA",
    selected: false,
  },
];

const DtrNextScreenData = [
  {
    id: 1,
    label: "DTR Type",
    input: "",
    note: "*(New/AUG)",
  },
  {
    id: 2,
    label: "11 Kv Feeder Code",
    input: "",
    note: "*(Which DTR is Erected)",
  },
  {
    id: 3,
    label: "11 Kv Feeder Name",
    input: "",
    note: "*(Which DTR is Erected)",
  },
  {
    id: 4,
    label: "Scheme og 11 KV Line",
    input: "",
  },
  {
    id: 5,
    label: "Emanating SS Code",
    input: "",
  },
  {
    id: 6,
    label: "Emanating SS Name",
    input: "",
  },
  {
    id: 7,
    label: "Scheme of Emanating SS",
    input: "",
  },
  {
    id: 8,
    label: "Emanating SS Village Name",
    input: "",
  },
  {
    id: 9,
    label: "Emanating SS Village Census Code",
    input: "",
  },
];

const DtrCardData = [
  {
    id: 1,
    image: Images.splash,
    title: "DTR Latitude",
    titleText: "39.8951",
    subtitle: "DTR Longitude",
    subtitleText: "39.8951",
  },
  {
    id: 2,
    image: Images.splash,
    title: "DTR Latitude",
    titleText: "39.8951",
    subtitle: "DTR Longitude",
    subtitleText: "39.8951",
  },
];

const dropDownData = [
  {
    title: "Quarter 1",
    targetDate: "31-08-2023",
    publishedDate: "31-08-2023",
    status: "Lorem ipsum os simply funny as hell.",
    remarks:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    documents: ["pdf1", "pdf2"],
  },
  {
    title: "Quarter 2",
    targetDate: "31-08-2023",
    publishedDate: "31-08-2023",
    status: "Lorem ipsum os simply funny as hell.",
    remarks:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    documents: ["pdf1", "pdf2"],
  },
];

const CommonTabsData1 = [
  {
    id: 1,
    title: "Evaluation \n Details",
    selected: false,
  },
  {
    id: 2,
    title: "Sanction and \n DPR Details",
    selected: true,
  },
];

const CommonTabsData2 = [
  {
    id: 1,
    title: "PQ & SoP",
    selected: false,
  },
  {
    id: 2,
    title: "REF",
    selected: true,
  },
];

const TableCardData = [
  {
    index: 1,
    leftText: "Max Marks",
    rightText: "25",
  },
  {
    index: 2,
    leftText: "Baseline",
    rightText: "25.00",
  },
  {
    index: 3,
    leftText: "Target",
    rightText: "13.52",
  },
  {
    index: 4,
    leftText: "Achievement",
    rightText: "12.90",
  },
  {
    index: 5,
    leftText: "Revised Max Marks",
    rightText: "0.00",
  },
];

const TableCardData2 = [
  {
    index: 1,
    leftText: "REF Score",
    centerText: "100%",
    rightText: "12.90",
  },
  {
    index: 2,
    leftText: "Financial Stability",
    centerText: "60%",
    rightText: "12.90",
  },
  {
    index: 3,
    leftText: "Outcome of Infrastructure Works",
    centerText: "50%",
    rightText: "12.90",
  },
  {
    index: 4,
    leftText: "Infrastructure Works",
    centerText: "10%",
    rightText: "12.90",
  },
  {
    index: 5,
    leftText: "Policy and Structural Reforms",
    centerText: "10%",
    rightText: "12.90",
  },
];

const innerTabData = [
  {
    id: 1,
    title: "DTR",
  },
  {
    id: 2,
    title: "Power Transformers",
  },
  {
    id: 3,
    title: "Substations",
  },
  {
    id: 4,

    title: "Feeder",
  },
];

const navigationTabData = [
  {
    id: 1,
    title: "Substation - RDSS",
  },
  {
    id: 2,
    title: "Substation - Non RDSS",
  },
  {
    id: 3,
    title: "Exisiting Feeder - RDSS",
  },
  {
    id: 4,
    title: "Exisiting Feeder - Non RDSS",
  },
];

const PowerTransformerCardsData = [
  {
    id: 1,
    icon: <IcnPowerTransformer />,
    title:
      "Augmentation of Power Substation: Additional Power Transformer 66/11 kV S/S",
  },
  {
    id: 2,
    icon: <IcnPowerTransformer />,
    title:
      "Augmentation of Power Substation: Additional Power Transformer 66/11 kV S/S",
  },
  {
    id: 3,
    icon: <IcnPowerTransformer />,
    title:
      "Augmentation of Power Substation: Additional Power Transformer 66/11 kV S/S",
  },
  {
    id: 4,
    icon: <IcnPowerTransformer />,
    title:
      "Augmentation of Power Substation: Additional Power Transformer 66/11 kV S/S",
  },
  {
    id: 5,
    icon: <IcnPowerTransformer />,
    title:
      "Augmentation of Power Substation: Additional Power Transformer 66/11 kV S/S",
  },
  {
    id: 6,
    icon: <IcnPowerTransformer />,
    title:
      "Augmentation of Power Substation: Additional Power Transformer 66/11 kV S/S",
  },
];


const SECTIONS = [
  {
    title: "PQ-1",
    content: "Date of publishing quarterly un-audited accounts*",
    isSelected: false,
  },
  {
    title: "PQ-2",
    content: "Date of publishing annual audited account*",
    isSelected: false,
  },
  {
    title: "PQ-3",
    content:
      "New regulatory asset created in current tariff determination cyclet*",
    isSelected: false,
  },
  {
    title: "PQ-4",
    content: "Subsidy payment by State Government*",
    isSelected: false,
  },
  {
    title: "PQ-5",
    content:
      "Electricity dues for the year (under evaluation) by all Government Departments/ Attached Offices/ Local Bodies/ Autonomous Bodies/ Boards/Corporations*",
    isSelected: false,
  },
  {
    title: "PQ-6",
    content: "Installation of prepaid meters in Government offices*",
    isSelected: false,
  },
  {
    title: "PQ-7",
    content: "No. of days Payables to Creditors including Gencos*",
    isSelected: false,
  },
  {
    title: "PQ-8",
    content: "Timely Filing of Tariff and True Up Petition and Order Issuance*",
    isSelected: false,
  },
];

//---------------------- Added by k.Sagar----------------------//

const LTHToptions = [{ label: "Select" }, { label: "LT Line" }, { label: "HT Line" }];
const Scheme = [{ id: 1, title: "RDSS" }, { id: 2, title: "Non-RDSS" }]
const UGorOH = [{ id: 1, title: "UG" }, { id: 2, title: "OH" }];
const WhetherCableOrConductor = [{ id: 1, title: "Cable" }, { id: 1, title: "Conductor" }]
const TypeOfCable = [{ id: 1, title: "AB Cable" }, { id: 2, title: "XLPE" }, { id: 3, title: "Other" }]
const TypeOfConductor = [{ id: 1, title: "Dog" }, { id: 2, title: "Rabbit" }, { id: 3, title: "Weasel" }, { id: 4, title: "Panther" }, { id: 5, title: "Raccoon" }
  , { id: 6, title: "Squirrel" }, { id: 7, title: "Other" }
]
const SinglePhaseThreePhase = [{ id: 1, title: "Single Phase" }, { id: 2, title: "Three Phase" }]
const CircuitType = [{ id: 1, title: "1" }, { id: 2, title: "2" }, { id: 3, title: "3" }, { id: 4, title: "4" }, { id: 5, title: "5" }, { id: 6, title: "6" }, { id: 7, title: "7" }]

const LTLineVoltage = [{ id: 1, title: "11 KV" }, { id: 2, title: "22 kv" }, { id: 3, title: "33 kv" }, { id: 4, title: "66 kv" }, { id: 5, title: "Other" }];
const PoleStructur = [{ id: 1, title: "Double Pole" }, { id: 2, title: "Three Pole Structure" }];
const PoleType = [{ "feeder_name": "PCC" }, { "feeder_name": "Lattice" }, { "feeder_name": "H-Beam" }, { "feeder_name": "STP" }, { "feeder_name": "RCC" }, { "feeder_name": "Rail Pole" }, { "feeder_name": "Others" }]
const RDSSExisting = [{ "feeder_name": "RDSS" }, { "feeder_name": "Existing" }];
const BranchPoint = [{ "feeder_name": "Yes" }, { "feeder_name": "No" }];
const EngravedUnderRDSS = [{ "feeder_name": "Yes" }, { "feeder_name": "No" }];

const HouseHoldDropDown = [{ "title": "PVTG" }, { "title": "VVP" }, { "title": "Additional Households" }];


const Line = ["LT Line", "HT Line"];
const Scheme1 = ["RDSS", "Non-RDSS"];
const UGorOH1 = ["UG", "OH"];
const LTLineVoltage1 = ["11 KV", "22 kv", "33 kv", "66 kv", "Other"];
const WhetherCableOrConductor1 = ["Cable", "Conductor"];
const TypeOfCable1 = ["AB Cable", "XLPE", "Other"];

const TypeOfCableSize1 = ["AB Cable 16 Sq.mm", "AB Cable 25 Sq.mm", "AB Cable 35 Sq.mm", "AB Cable 50 Sq.mm", "AB Cable 70 Sq.mm", "AB Cable 95 sq.mm"];
const TypeOfCableSize2 = [
  "AB Cable 16 sq.mm",
  "AB Cable 25 Sq. mm",
  "AB Cable 35 Sq. mm",
  "AB Cable 50 Sq. mm",
  "AB Cable 70 Sq. mm",
  "AB Cable 90 sq.mm",
  "AB Cable 95 Sq. mm",
  "AB Cable 120 Sq. mm",
  "AB Cable 150 Sq. mm",
  "AB Cable 185 Sq. mm",
  "AB Cable 240 Sq. mm",
];
const TypeOfCableSize3 = [
  "XLPE 16 Sq. mm",
  "XLPE 25 Sq. mm",
  "XLPE 35 Sq. mm",
  "XLPE 50 Sq. mm",
  "XLPE 70 Sq. mm",
  "XLPE 95 Sq. mm",
  "XLPE 120 Sq. mm",
  "XLPE 150 Sq. mm",
  "XLPE 185 Sq. mm",
  "XLPE 240 Sq. mm",
  "XLPE 300 Sq. mm",
  "XLPE 400 Sq. mm",
  "XLPE 600 sq.mm",
  "XLPE 630 sq.mm",
];
const TypeOfCableSize4 = [
  "XLPE 16 Sq.mm",
  "XLPE 25 Sq.mm",
  "XLPE 35 sq.mm",
  "XLPE 50 sq.mm",
  "XLPE 70 sq.mm",
  "XLPE 95 sq.mm",
  "XLPE 120 sq.mm",
  "XLPE 150 sq.mm",
  "XLPE 185 Sq.mm",
  "XLPE 240 sq.mm",
  "XLPE 300 sq.mm",
  "XLPE 400 sq.mm",
];

const TypeOfConductor1 = ["Dog", "Rabbit", "Weasel", "Panther", "Raccoon", "Squirrel", "AAAC", "AL59", "MVCC", "Other"];
const PoleStructur1 = ["Double Pole", "Three Pole Structure", "Single Pole", "Mono Pole", "Four Pole"];
const CircuitType1 = ["1", "2", "3", "4", "5", "6", "7"];
const PoleType1 = ["PCC", "Lattice", "H-Beam", "STP", "RCC", "Rail Pole", "Tri-Pole", "Four-Pole", "PSC", "RSJ", "Others"];
const SinglePhaseThreePhase1 = ["Single Phase", "Three Phase"];
const RDSSExisting1 = ["RDSS", "Existing"];
const BranchPoint1 = ["Yes", "No"];
const EngravedUnderRDSS1 = ["Yes", "No"];
const ddrFeederGeotagFilterStatus = [{ "name": "Pending for approval", "value": "Pending" }, { "name": "Approved", "value": "Approved" }, { "name": "Returned", "value": "Returned" }];
const ddrFeederStatus = [{ "name": "Action Pending", "value": "Pending" }, { "name": "No Action Pending", "value": "Approved" }];
const otherAssetAtributesCapacitorBankLocation = ["Substation", "OH", "UG"];
const otherAssetAtributesCapacitorBankLinePosition = ["OH", "UG"];
const otherAssetAtributesCircuitBreakerType = ["VCB", "SF6", "ACB"];
const otherAssetAtributesCircuitBreakerVoltage = ["11 KV ", "33 KV"];

const otherAssetAtributesRMU = ["2 way", "3 way", "4 way", "5 way"];
const otherAssetAtributesRMUCBtype = ["NA", "SF6", "VCB", "ACB"];
const otherAssetAtributesScadaCompatibility = ["Yes", "No"];

const otherAssetAtributesProtocolSupported = ["IEC-104", "DNP3", "Modbus"];

const AssetType = [{ "feeder_name": "Pole" }, { "feeder_name": "DTR-RDSS" }, { "feeder_name": "DTR-Existing" },
{ "feeder_name": "Others-RDSS" }, { "feeder_name": "Others-Existing" }, { feeder_name: "Rout Point / Marker" },
{ feeder_name: "LTDB" }, { feeder_name: "Feeder Pillar" }];

export {
  RdssCardData, RdssProgressDetailsData, RdssActionCentreCardData, DtrData, loseTabData, DtrNextScreenData, DtrCardData, tabData, dropDownData, CommonTabsData1, CommonTabsData2,
  TableCardData, TableCardData2, innerTabData, navigationTabData, PowerTransformerCardsData, SECTIONS, Scheme, LTHToptions,
  UGorOH, WhetherCableOrConductor, HouseHoldDropDown, TypeOfCable, TypeOfConductor, SinglePhaseThreePhase, CircuitType, PoleStructur, LTLineVoltage, PoleType, RDSSExisting, BranchPoint, EngravedUnderRDSS,
  Scheme1, UGorOH1, LTLineVoltage1, WhetherCableOrConductor1, TypeOfCable1, TypeOfConductor1, PoleStructur1, PoleType1, CircuitType1, SinglePhaseThreePhase1,
  RDSSExisting1, BranchPoint1, EngravedUnderRDSS1, Line, ddrFeederGeotagFilterStatus, ddrFeederStatus, TypeOfCableSize1, TypeOfCableSize2, TypeOfCableSize3, TypeOfCableSize4,
  otherAssetAtributesCapacitorBankLocation, otherAssetAtributesCapacitorBankLinePosition, otherAssetAtributesCircuitBreakerType, otherAssetAtributesCircuitBreakerVoltage,
  otherAssetAtributesRMU, otherAssetAtributesRMUCBtype, otherAssetAtributesScadaCompatibility, otherAssetAtributesProtocolSupported, AssetType,
};
