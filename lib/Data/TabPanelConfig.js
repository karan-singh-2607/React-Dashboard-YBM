import { FiUser } from 'react-icons/fi';
import { MdOutlineContacts } from 'react-icons/md';
import { IoDocumentsOutline } from 'react-icons/io5';
import { GrGroup } from 'react-icons/gr';
import { AiOutlineBank } from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs';
import PersonalInformation from '../../Components/Form/Employee Personal Information';
import ContactDetails from '../../Components/Form/Employee Contact Details';
import EmployeementDetails from '../../Components/Form/Employee Employement Details';
import BankDetails from '../../Components/Form/Employee Bank Details';
import FamilyDetails from '../../Components/Form/Employee Family Details';
import EmployeeDocuments from '../../Components/Form/Employee Documents';

const TabPanel = [
  {
    id: 'personalDetails',
    label: 'Personal Details',
    icon: FiUser,
    Component: PersonalInformation,
  },
  {
    id: 'contactDetails',
    label: 'Contact  Details',
    icon: MdOutlineContacts,
    Component: ContactDetails,
  },
  {
    id: 'employementDetails',
    label: 'EMployment  Details',
    icon: BsBriefcase,
    Component: EmployeementDetails,
  },
  {
    id: 'bankDetails',
    label: 'Bank  Details',
    icon: AiOutlineBank,
    Component: BankDetails,
  },
  {
    id: 'familyDetails',
    label: 'Family  Details',
    icon: GrGroup,
    Component: FamilyDetails,
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: IoDocumentsOutline,
    Component: EmployeeDocuments,
  },
];

const TabPanelConfig = [...TabPanel];
export default TabPanelConfig;
