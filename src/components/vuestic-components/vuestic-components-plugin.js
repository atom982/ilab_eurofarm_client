import Alert from "src/components/vuestic-components/vuestic-alert/VuesticAlert.vue";
import Chart from "src/components/vuestic-components/vuestic-chart/VuesticChart.vue";
import Chat from "src/components/vuestic-components/vuestic-chat/VuesticChat.vue";
import Checkbox from "src/components/vuestic-components/vuestic-checkbox/VuesticCheckbox.vue";
import DataTable from "src/components/vuestic-components/vuestic-datatable/VuesticDataTable.vue";
import LabAssaysTable from "src/components/labassays/vuestic-datatable/VuesticDataTable.vue";
import AnaAssaysTable from "src/components/anaassays/vuestic-datatable/VuesticDataTable.vue";
import ControlEditTable from "src/components/kontrole/definicija/Table/edit-datatable/VuesticDataTable.vue";
import FileUpload from "src/components/vuestic-components/vuestic-file-upload/VuesticFileUpload";
import ExcelFileUpload from "src/components/excel/vuestic-file-upload/VuesticFileUpload";
import PacijentsTable from "src/components/02_prijem/PacijentsTable.vue";
import ProduktTable from "src/components/inventar/produkti/ProduktTable.vue";
import Feed from "src/components/vuestic-components/vuestic-feed/VuesticFeed.vue";
import Modal from "src/components/vuestic-components/vuestic-modal/VuesticModal.vue";
import ModalDrS from "src/components/02_samples/DrugoStanje.vue";
import ModalM from "src/components/vuestic-components/vuestic-modal/VuesticModalMedium.vue";
import ModalS from "src/components/vuestic-components/vuestic-modal/VuesticModalStatic.vue";
import ModalPatient from "src/components/02_samples/Patient.vue";
import ModalProdukt from "src/components/inventar/produkti/Produkt.vue";
import ChangePassword from "src/components/layout/navbar/ChangePassword.vue";
import InitialPassword from "src/components/layout/navbar/InitialPassword.vue";
import PatientEdit from "src/components/02_prijem/PatientEdit.vue";
import ModalSamplesEntryCommenting from "src/components/02_samples/Commenting.vue";
import ModalSamplesEntryCalendar from "src/components/02_samples/Calendar.vue";

import ModalEurofarmCalendar from "src/components/obrada/Calendar.vue";

import VuesticModalDelete from "src/components/obrada/components/VuesticModalDelete";
import VuesticModalEdit from "src/components/obrada/components/VuesticModalEdit";
import VuesticModalReport from "src/components/reports/VuesticModal";
import VuesticModalMulti from "src/components/obrada/components/VuesticModalMulti";
import VuesticModalComment from "src/components/obrada/components/VuesticModalComment";
import VuesticModalFind from "src/components/obrada/components/VuesticModalFind";
import VuesticModalReference from "src/components/obrada/components/VuesticModalReference";
import VuesticModalMail from "src/components/obrada/components/VuesticModalMail";
import VuesticModalError from "src/components/obrada/components/VuesticModalError";
import VuesticModalHandshake from "src/components/obrada/components/VuesticModalHandshake";
import VuesticModalData from "src/components/nalazi/pregled/VuesticModalData";
import VuesticModalViberService from "src/components/nalazi/pregled/VuesticModalViberService";
import VuesticModalExclamation from "src/components/obrada/components/VuesticModalExclamation";
import VuesticModalUzorci from "src/components/obrada/components/VuesticModalUzorci";
import VuesticModalAparati from "src/components/obrada/components/VuesticModalAparati";
import EvaluationSingle from "src/components/obrada/components/VuesticModalEvaluationSingle";
import EvaluationMulti from "src/components/obrada/components/VuesticModalEvaluationMulti";
import VuesticModalAllResults from "src/components/obrada/components/VuesticModalAllResults";
import VuesticModalResultsMulti from "src/components/obrada/components/VuesticModalResultsMulti";
import LabAssayEditModal from "src/components/labassays/LabAssayEditModal";
import SiteModal from "src/components/postavke/SiteModal";
import UserModal from "src/components/postavke/UserModal";
import PostavkeRadioButton from "src/components/postavke/RadioButton";
import PostavkeModal from "src/components/postavke/PostavkeModal";
import MultiModal from "src/components/labassays/MultiModal";
import LabAssayDelete from "src/components/labassays/LabAssayDelete";
import AnaAssayDelete from "src/components/anaassays/AnaAssayDelete";
import AnaAssayEditModal from "src/components/anaassays/AnaAssayEditModal";
import AnaAssayRefSingle from "src/components/anaassays/AnaAssayRefSingle";
import AnaAssayRefMulti from "src/components/anaassays/AnaAssayRefMulti";
import PreLoader from "src/components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue";
import ProfileCard from "src/components/vuestic-components/vuestic-profile-card/VuesticProfileCard.vue";
import ProgressBar from "src/components/vuestic-components/vuestic-progress-bar/VuesticProgressBar.vue";
import Scrollbar from "src/components/vuestic-components/vuestic-scrollbar/VuesticScrollbar.vue";
import SimpleSelect from "src/components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect.vue";
import SimpleSelectBubble from "src/components/evaluation/VuesticSimpleSelect.vue";
import MultiSelect from "src/components/vuestic-components/vuestic-multi-select/VuesticMultiSelect.vue";
import InputSelect from "src/components/vuestic-components/vuestic-input-select/VuesticInputSelect.vue";
import SocialNews from "src/components/vuestic-components/vuestic-social-news/VuesticSocialNews.vue";
import Switch from "src/components/vuestic-components/vuestic-switch/VuesticSwitch.vue";
import Tabs from "src/components/vuestic-components/vuestic-tabs/VuesticTabs.vue";
import Tag from "src/components/vuestic-components/vuestic-tag/VuesticTag";
import TagGroup from "src/components/vuestic-components/vuestic-tag/VuesticTagGroup";
import Tooltip from "src/components/vuestic-components/vuestic-tooltip/VuesticTooltip.vue";
import Popover from "src/components/vuestic-components/vuestic-popover/VuesticPopover.vue";
import Widget from "src/components/vuestic-components/vuestic-widget/VuesticWidget.vue";
import WidgetBubble from "src/components/evaluation/VuesticWidget.vue";
import MediumEditor from "src/components/vuestic-components/vuestic-medium-editor/VuesticMediumEditor.vue";
import VuesticToasted from "src/components/vuestic-mixins/VuesticToasted";
import SiteDropdown from "src/components/vuestic-components/vuestic-site/SiteDropdown.vue";
import Dropdown from "src/components/vuestic-directives/Dropdown";
import DatePicker from "src/components/vuestic-components/vuestic-date-picker/VuesticDatePicker";
import TreeRoot from "src/components/vuestic-components/vuestic-tree-view/VuesticTreeRoot";
import TreeNode from "src/components/vuestic-components/vuestic-tree-view/VuesticTreeNode";
import TreeCategory from "src/components/vuestic-components/vuestic-tree-view/VuesticTreeCategory";
import RadioButton from "src/components/vuestic-components/vuestic-radio-button/VuesticRadioButton.vue";
import VuesticAccordionPatientInfo from "src/components/vuestic-components/vuestic-collapse/VuesticAccordionPatientInfo";
import VuesticAccordionSamplesEntry from "src/components/vuestic-components/vuestic-collapse/VuesticAccordionSamplesEntry";
import VuesticAccordionObrada from "src/components/obrada/components/VuesticAccordionObrada";
import VuesticCollapsePatientInfo from "src/components/vuestic-components/vuestic-collapse/VuesticCollapsePatientInfo";
import VuesticCollapseSamplesEntry from "src/components/vuestic-components/vuestic-collapse/VuesticCollapseSamplesEntry";
import VuesticCollapseObrada from "src/components/obrada/components/VuesticCollapseObrada";
import VuesticCollapseNalaz from "src/components/obrada/components/VuesticCollapseNalaz";
import VuesticCollapseUzorak from "src/components/obrada/components/VuesticCollapseUzorak";
import VuesticCollapseAparati from "src/components/obrada/components/VuesticCollapseAparati";
import Wizard from "src/components/vuestic-components/vuestic-wizard/VuesticWizard.vue";
import JsonEditLabAssay from "src/components/labassays/JsonEdit.vue";
import JsonEditPostavke from "src/components/postavke/JsonEdit.vue";
import JsonEditAnalysers from "src/components/analysers/JsonEdit.vue";
import JsonEditFrizider from "src/components/loger/postavke/JsonEdit.vue";
import KalibracijaModal from "src/components/loger/postavke/KalibracijaModal.vue";
import VuesticModalGraph from "src/components/loger/pregled/VuesticModalGraph.vue";
import VuesticModalTable from "src/components/loger/pregled/VuesticModalTable.vue";
import postavkeAccordion from "src/components/postavke/postavkeAccordion.vue";
import postavkeCollapse from "src/components/postavke/postavkeCollapse.vue";
import postavkeDeleteSites from "src/components/postavke/postavkeDeleteSites.vue";
import postavkeDeleteUsers from "src/components/postavke/postavkeDeleteUsers.vue";
import MikrobiologijaEdit from "src/components/mikrobiologija/MikrobiologijaEdit.vue";
import VuesticModalMicroReset from "src/components/obrada/components/VuesticModalMicroReset";
import VuesticModalMicroResult from "src/components/obrada/components/VuesticModalMicroResult";
import VuesticModalMicroBactery from "src/components/obrada/components/VuesticModalMicroBactery";
import VuesticTabsBactery from "src/components/obrada/components/VuesticTabsBactery";
import RadioButtonBactery from "src/components/obrada/components/RadioButtonBactery";

import ControlDeleteModal from "src/components/kontrole/definicija/components/ControlDeleteModal";
import ControlEditModal from "src/components/kontrole/definicija/components/ControlEditModal";
import ControlReferences from "src/components/kontrole/definicija/components/ControlReferences";
import VuesticModalControlAparati from "src/components/kontrole/definicija/components/VuesticModalControlAparati";
import VuesticAccordionControlAparati from "src/components/kontrole/definicija/components/VuesticAccordionControlAparati";
import VuesticCollapseControlAparati from "src/components/kontrole/definicija/components/VuesticCollapseControlAparati";

import VuesticControlAccordion from "src/components/kontrole/unos/components/VuesticAccordion";
import VuesticControlCollapse from "src/components/kontrole/unos/components/VuesticCollapse";

// Obrada Kontrolnih uzoraka

import VuesticAccordionObradaControl from "src/components/kontrole/pregled/components/AccordionObrada";
import VuesticCollapseObradaControl from "src/components/kontrole/pregled/components/CollapseObrada";
import VuesticModalCommentControl from "src/components/kontrole/pregled/components/ModalComment";
import VuesticModalControlDelete from "src/components/kontrole/pregled/components/ModalDelete";
import VuesticModalErrorControl from "src/components/kontrole/pregled/components/ModalError";
import VuesticModalMailControl from "src/components/kontrole/pregled/components/VuesticModalMail";
import VuesticWidgetControl from "src/components/kontrole/pregled/components/VuesticWidget";

// End of Obrada Kontrolnih uzoraka

// Partneri - Pošiljaoc, Naručioc i Izvršioc

import VuesticModalPartneriDelete from "src/components/partneri/VuesticModalPartneriDelete";
import VuesticModalPartneriEdit from "src/components/partneri/VuesticModalPartneriEdit";
import VuesticModalPartneriInfo from "src/components/partneri/VuesticModalPartneriInfo";

// End of Partneri - Pošiljaoc, Naručioc i Izvršioc

const VuesticComponentsPlugin = {
  install(Vue, options) {

    Vue.component(VuesticModalPartneriDelete.name, VuesticModalPartneriDelete);
    Vue.component(VuesticModalPartneriEdit.name, VuesticModalPartneriEdit);
    Vue.component(VuesticModalPartneriInfo.name, VuesticModalPartneriInfo);

    Vue.component(ControlDeleteModal.name, ControlDeleteModal);
    Vue.component(ControlEditModal.name, ControlEditModal);
    Vue.component(ControlReferences.name, ControlReferences);
    Vue.component(VuesticModalControlAparati.name, VuesticModalControlAparati);
    Vue.component(VuesticAccordionControlAparati.name, VuesticAccordionControlAparati);
    Vue.component(VuesticCollapseControlAparati.name, VuesticCollapseControlAparati);

    Vue.component(VuesticControlAccordion.name, VuesticControlAccordion);
    Vue.component(VuesticControlCollapse.name, VuesticControlCollapse);

    // Obrada Kontrolnih uzoraka

    Vue.component(VuesticAccordionObradaControl.name, VuesticAccordionObradaControl);
    Vue.component(VuesticCollapseObradaControl.name, VuesticCollapseObradaControl);
    Vue.component(VuesticModalCommentControl.name, VuesticModalCommentControl);
    Vue.component(VuesticModalControlDelete.name, VuesticModalControlDelete);
    Vue.component(VuesticModalErrorControl.name, VuesticModalErrorControl);
    Vue.component(VuesticModalMailControl.name, VuesticModalMailControl);
    Vue.component(VuesticWidgetControl.name, VuesticWidgetControl);

    // End of Obrada Kontrolnih uzoraka

    Vue.component(Alert.name, Alert);
    Vue.component(Chart.name, Chart);
    Vue.component(Chat.name, Chat);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(DataTable.name, DataTable);
    Vue.component(LabAssaysTable.name, LabAssaysTable);
    Vue.component(AnaAssaysTable.name, AnaAssaysTable);
    Vue.component(ControlEditTable.name, ControlEditTable);
    Vue.component(FileUpload.name, FileUpload);
    Vue.component(ExcelFileUpload.name, ExcelFileUpload);
    Vue.component(PacijentsTable.name, PacijentsTable);
    Vue.component(ProduktTable.name, ProduktTable);
    Vue.component(Feed.name, Feed);
    Vue.component(Modal.name, Modal);
    Vue.component(ModalM.name, ModalM);
    Vue.component(ChangePassword.name, ChangePassword);
    Vue.component(InitialPassword.name, InitialPassword);
    Vue.component(ModalPatient.name, ModalPatient);
    Vue.component(ModalProdukt.name, ModalProdukt);
    Vue.component(VuesticModalReport.name, VuesticModalReport);
    Vue.component(PatientEdit.name, PatientEdit);
    Vue.component(
      ModalSamplesEntryCommenting.name,
      ModalSamplesEntryCommenting
    );
    Vue.component(ModalSamplesEntryCalendar.name, ModalSamplesEntryCalendar);
    Vue.component(ModalEurofarmCalendar.name, ModalEurofarmCalendar);
    Vue.component(LabAssayDelete.name, LabAssayDelete);
    Vue.component(AnaAssayDelete.name, AnaAssayDelete);
    Vue.component(ModalS.name, ModalS);
    Vue.component(ModalDrS.name, ModalDrS);
    Vue.component(VuesticModalDelete.name, VuesticModalDelete);
    Vue.component(VuesticModalEdit.name, VuesticModalEdit);
    Vue.component(VuesticModalMulti.name, VuesticModalMulti);
    Vue.component(VuesticModalComment.name, VuesticModalComment);
    Vue.component(VuesticModalFind.name, VuesticModalFind);
    Vue.component(VuesticModalReference.name, VuesticModalReference);
    Vue.component(VuesticModalMail.name, VuesticModalMail);
    Vue.component(VuesticModalError.name, VuesticModalError);
    Vue.component(VuesticModalHandshake.name, VuesticModalHandshake);
    Vue.component(VuesticModalData.name, VuesticModalData);
    Vue.component(VuesticModalViberService.name, VuesticModalViberService);
    Vue.component(VuesticModalExclamation.name, VuesticModalExclamation);
    Vue.component(VuesticModalUzorci.name, VuesticModalUzorci);
    Vue.component(VuesticModalAparati.name, VuesticModalAparati);
    Vue.component(EvaluationSingle.name, EvaluationSingle);
    Vue.component(EvaluationMulti.name, EvaluationMulti);
    Vue.component(VuesticModalAllResults.name, VuesticModalAllResults);
    Vue.component(VuesticModalResultsMulti.name, VuesticModalResultsMulti);
    Vue.component(LabAssayEditModal.name, LabAssayEditModal);
    Vue.component(SiteModal.name, SiteModal);
    Vue.component(UserModal.name, UserModal);
    Vue.component(PostavkeRadioButton.name, PostavkeRadioButton);
    Vue.component(PostavkeModal.name, PostavkeModal);
    Vue.component(AnaAssayEditModal.name, AnaAssayEditModal);
    Vue.component(AnaAssayRefSingle.name, AnaAssayRefSingle);
    Vue.component(AnaAssayRefMulti.name, AnaAssayRefMulti);
    Vue.component(MultiModal.name, MultiModal);
    Vue.component(PreLoader.name, PreLoader);
    Vue.component(ProfileCard.name, ProfileCard);
    Vue.component(ProgressBar.name, ProgressBar);
    Vue.component(Scrollbar.name, Scrollbar);
    Vue.component(SimpleSelect.name, SimpleSelect);
    Vue.component(SimpleSelectBubble.name, SimpleSelectBubble);
    Vue.component(MultiSelect.name, MultiSelect);
    Vue.component(InputSelect.name, InputSelect);
    Vue.component(SocialNews.name, SocialNews);
    Vue.component(Switch.name, Switch);
    Vue.component(Tabs.name, Tabs);
    Vue.component(Tag.name, Tag);
    Vue.component(TagGroup.name, TagGroup);
    Vue.component(Tooltip.name, Tooltip);
    Vue.component(Popover.name, Popover);
    Vue.component(Widget.name, Widget);
    Vue.component(WidgetBubble.name, WidgetBubble);
    Vue.component(MediumEditor.name, MediumEditor);
    Vue.component(SiteDropdown.name, SiteDropdown);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(TreeRoot.name, TreeRoot);
    Vue.component(TreeNode.name, TreeNode);
    Vue.component(TreeCategory.name, TreeCategory);
    Vue.component(RadioButton.name, RadioButton);
    Vue.component(
      VuesticAccordionPatientInfo.name,
      VuesticAccordionPatientInfo
    );
    Vue.component(
      VuesticAccordionSamplesEntry.name,
      VuesticAccordionSamplesEntry
    );
    Vue.component(VuesticAccordionObrada.name, VuesticAccordionObrada);
    Vue.component(VuesticCollapsePatientInfo.name, VuesticCollapsePatientInfo);
    Vue.component(
      VuesticCollapseSamplesEntry.name,
      VuesticCollapseSamplesEntry
    );
    Vue.component(VuesticCollapseObrada.name, VuesticCollapseObrada);
    Vue.component(VuesticCollapseNalaz.name, VuesticCollapseNalaz);
    Vue.component(VuesticCollapseUzorak.name, VuesticCollapseUzorak);
    Vue.component(VuesticCollapseAparati.name, VuesticCollapseAparati);
    Vue.component(Wizard.name, Wizard);
    Vue.component(JsonEditLabAssay.name, JsonEditLabAssay);
    Vue.component(JsonEditPostavke.name, JsonEditPostavke);
    Vue.component(JsonEditAnalysers.name, JsonEditAnalysers);
    Vue.component(JsonEditFrizider.name, JsonEditFrizider);
    Vue.component(KalibracijaModal.name, KalibracijaModal);
    Vue.component(VuesticModalGraph.name, VuesticModalGraph);
    Vue.component(VuesticModalTable.name, VuesticModalTable);
    Vue.component(postavkeCollapse.name, postavkeCollapse);
    Vue.component(postavkeAccordion.name, postavkeAccordion);
    Vue.component(postavkeDeleteSites.name, postavkeDeleteSites);
    Vue.component(postavkeDeleteUsers.name, postavkeDeleteUsers);
    Vue.component(MikrobiologijaEdit.name, MikrobiologijaEdit);
    Vue.component(VuesticModalMicroReset.name, VuesticModalMicroReset);
    Vue.component(VuesticModalMicroResult.name, VuesticModalMicroResult);
    Vue.component(VuesticModalMicroBactery.name, VuesticModalMicroBactery);
    Vue.component(VuesticTabsBactery.name, VuesticTabsBactery);
    Vue.component(RadioButtonBactery.name, RadioButtonBactery);
    Vue.mixin(VuesticToasted);
    Vue.directive("dropdown", Dropdown);
  },
};

export default VuesticComponentsPlugin;
