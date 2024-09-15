import React, { useEffect, useRef, useState } from "react";
// import CarouselAds from "./CarouselAds";
import {
  Button,
  Form,
  Modal,
  Space,
  Input,
  Table,
  Tag,
  Radio,
  ConfigProvider,
  theme,
} from "antd";

import {
  SearchOutlined,
  EditFilled,
  DeleteFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import api from "../api";
import axios from "axios";

function HomePage() {
  /*
    Tasks : 
            TO Do
            IN PROGRESS
            DONE
  */
  const tableData = [
    {
      id: "1",
      title: "task 1",
      description: "Description 1",
      status: "pending",
    },
    {
      id: "2",
      title: "task 2",
      description: "Description 2",
      status: "in-progress",
    },
    {
      id: "3",
      title: "task 3",
      description: "Description 3",
      status: "completed",
    },
  ];
  const [loading, setLoading] = useState(false);

  // const [tableData, setTableData] = useState([]);
  // useEffect(() => {
  //   const getTasks = async () => {
  //     await api
  //       .get("/tasks", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //       });
  //   };

  //   getTasks();
  //   // api.get("tasks").then((res) => {
  //   //   console.log(res.data);
  //   // });
  // }, []);

  // -------------------
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
          className={`rounded-md border border-gray-300 ${
            mode === "dark" && "dark-mode"
          }`}
          // className="rounded-lg"
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={
              <SearchOutlined className="w-4 h-4 flex items-center justify-center" />
            }
            size="small"
            style={{
              // width: "",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // ----------------------------

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 5,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 18,
      },
    },
  };

  const [modalAddTask, setModalAddTask] = useState(false);
  const [loadingAddTask, setLoadingAddTask] = useState(false);
  const [formAddTask] = Form.useForm();
  // const titleAddTask = useRef(null);

  const onFinishAddTask = (values) => {
    console.log(values);
    // api
    //   .post("/tasks", values, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });

    // toast.success("sd", {
    //   position: "bottom-left",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    // });
  };

  // -----------------Edit Task---------------------

  const [formEditTask] = Form.useForm();
  const [modalEditTask, setModalEditTask] = useState(false);
  const [loadingUpdateTask, setLoadingUpdateTask] = useState(true);
  const titleUpdateTask = useRef(null);

  const handleEditClick = (record) => {
    formEditTask.setFieldsValue(record); // Set form fields to the selected row's data
    setModalEditTask(true); // Open modal
  };
  const onFinishEditTask = (values) => {
    console.log(values);

    // toast.success(" ", {
    //   position: "bottom-left",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    // });
  };

  // -----------------Delete Task----------------------
  const { confirm } = Modal;

  const showDeleteConfirm = (id) => {
    confirm({
      title: t("delete_task"),
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: t("yes"),
      okType: "danger",
      cancelText: t("no"),
      onOk() {
        console.log("OK");
        // axios.delete("")
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const { mode } = useSelector((state) => state.mode);

  const { t } = useTranslation();

  // -----------------------
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 100,
    //   sorter: (a, b) => a.id - b.id,
    //   sortDirections: ["descend", "ascend"],
    //   // fixed: "left",
    //   render: (text) => <p className="text-base">{text}</p>,
    // },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // width: "20%",
      ...getColumnSearchProps("title"),
      render: (text) => <p className="text-base">{text}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      // width: "25%",
      render: (text) => <p className="text-base">{text}</p>,
    },

    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      key: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "In Progress", value: "in-progress" },
        { text: "Completed", value: "completed" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text) => (
        <>
          {text === "pending" && (
            <Tag color="#F7B500" className="uppercase text-base">
              pending
            </Tag>
          )}
          {text === "in-progress" && (
            <Tag color="#0091FF" className="uppercase text-base">
              in progress
            </Tag>
          )}
          {text === "completed" && (
            <Tag color="#1DCD9F" className="uppercase text-base">
              completed
            </Tag>
          )}
        </>
      ),
    },

    {
      title: "Actions",
      key: "operation",
      // fixed: "right",
      width: "15%",
      render: (record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditClick(record)}
            className="px-1.5 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <EditFilled style={{ color: "white", fontSize: "18px" }} />
          </button>

          <button
            onClick={() => showDeleteConfirm(record.id)}
            className="px-1.5 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center"
          >
            <DeleteFilled style={{ color: "white", fontSize: "18px" }} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      {/* <CarouselAds /> */}

      {/* Main Section */}
      <div className="container bg-[#F4F6F9] dark:bg-slate-800 h-full w-full  rounded-lg flex flex-col gap-5 overflow-hidden mt-6">
        <p className="text-5xl uppercase font-semibold text-center my-3 text-[#008ECC] tracking-wider">
          {t("my_tasks")}
        </p>
        <div className="flex items-end flex-col" dir="ltr">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setModalAddTask(true)}
          >
            {t("add_task")}
          </button>

          {/* <ConfigProvider
            theme={{
              algorithm:
                mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
            // theme={{
            //   components:
            //     mode === "dark"
            //       ? {
            //           Table: {
            //             borderRadius: 8,
            //             borderRadiusLG: 8,
            //             boxShadowSecondary:
            //               "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
            //             colorBgContainer: "#141414",
            //             colorBorderSecondary: "#303030",
            //             colorFillAlter: "rgba(255, 255, 255, 0.04)",
            //             colorFillContent: "rgba(255, 255, 255, 0.12)",
            //             colorFillSecondary: "rgba(255, 255, 255, 0.12)",
            //             colorIcon: "rgba(255, 255, 255, 0.45)",
            //             colorIconHover: "rgba(255, 255, 255, 0.85)",
            //             colorLink: "#1668dc",
            //             colorLinkActive: "#1554ad",
            //             colorLinkHover: "#15417e",
            //             colorPrimary: "#1668dc",
            //             colorSplit: "rgba(253, 253, 253, 0.12)",
            //             colorText: "rgba(255, 255, 255, 0.85)",
            //             colorTextDescription: "rgba(255, 255, 255, 0.45)",
            //             colorTextDisabled: "rgba(255, 255, 255, 0.25)",
            //             colorTextHeading: "rgba(255, 255, 255, 0.85)",
            //             colorTextPlaceholder: "rgba(255, 255, 255, 0.25)",
            //           },
            //           Button: {
            //             controlTmpOutline: "rgba(255, 255, 255, 0.04)",
            //             controlOutline: "rgba(0, 60, 180, 0.15)",
            //             colorTextLightSolid: "#fff",
            //             colorTextDisabled: "rgba(255, 255, 255, 0.25)",
            //             colorText: "rgba(255, 255, 255, 0.85)",
            //             colorPrimaryHover: "#3c89e8",
            //             colorPrimaryBorder: "#15325b",
            //             colorPrimaryActive: "#1554ad",
            //             colorPrimary: "#1668dc",
            //             colorLinkHover: "#15417e",
            //             colorLinkActive: "#1554ad",
            //             colorLink: "#1668dc",
            //             colorBorder: "#424242",
            //             colorBgTextHover: "rgba(255, 255, 255, 0.12)",
            //             colorBgTextActive: "rgba(255, 255, 255, 0.18)",
            //             colorBgContainerDisabled: "rgba(255, 255, 255, 0.08)",
            //             colorBgContainer: "#141414",
            //           },
            //           Pagination: {
            //             colorBgContainer: "#141414",
            //             colorBgContainerDisabled: "rgba(255, 255, 255, 0.08)",
            //             colorBgTextActive: "rgba(255, 255, 255, 0.18)",
            //             colorBgTextHover: "rgba(255, 255, 255, 0.12)",
            //             colorBorder: "#424242",
            //             colorPrimary: "#1668dc",
            //             colorPrimaryBorder: "#15325b",
            //             colorPrimaryHover: "#3c89e8",
            //             colorText: "rgba(255, 255, 255, 0.85)",
            //             colorTextDisabled: "rgba(255, 255, 255, 0.25)",
            //             colorTextPlaceholder: "rgba(255, 255, 255, 0.25)",
            //           },
            //           Input: {
            //             colorBgContainer: "#141414",
            //             colorBgContainerDisabled: "rgba(255, 255, 255, 0.08)",
            //             colorBorder: "#424242",
            //             colorFillAlter: "rgba(255, 255, 255, 0.04)",
            //             colorIcon: "rgba(255, 255, 255, 0.45)",
            //             colorIconHover: "rgba(255, 255, 255, 0.85)",
            //             colorPrimary: "#1668dc",
            //             colorPrimaryActive: "#1554ad",
            //             colorPrimaryHover: "#3c89e8",
            //             colorText: "rgba(255, 255, 255, 0.85)",
            //             colorTextDescription: "rgba(255, 255, 255, 0.45)",
            //             colorTextDisabled: "rgba(255, 255, 255, 0.25)",
            //             colorTextPlaceholder: "rgba(255, 255, 255, 0.25)",
            //             colorTextQuaternary: "rgba(255, 255, 255, 0.25)",
            //             colorTextTertiary: "rgba(255, 255, 255, 0.45)",
            //           },
            //           Dropdown: {
            //             colorBgContainer: "#141414",
            //             colorBorder: "#303030",
            //             colorText: "rgba(255, 255, 255, 0.85)",
            //             colorTextDisabled: "rgba(255, 255, 255, 0.25)",
            //             colorBgItemActive: "rgba(255, 255, 255, 0.12)",
            //             colorBgItemHover: "rgba(255, 255, 255, 0.08)",
            //           },
            //           Checkbox: {
            //             colorBgContainer: "#141414",
            //             colorBorder: "#303030",
            //             colorCheckBg: "#1668dc",
            //             colorCheckBorder: "#303030",
            //             colorText: "rgba(255, 255, 255, 0.85)",
            //             colorTextDisabled: "rgba(255, 255, 255, 0.25)",
            //           },
            //           Menu: {
            //             colorBgContainer: "#1f1f1f",
            //             colorItemBgHover: "#333",
            //             colorItemText: "rgba(255, 255, 255, 0.85)",
            //             colorItemTextHover: "rgba(255, 255, 255, 1)",
            //             colorBorder: "#424242",
            //           },
            //         }
            //       : "",
            // }}
          >
          </ConfigProvider> */}
          <Table
            className="w-full mt-5"
            columns={columns}
            dataSource={tableData}
            pagination={{
              pageSize: 5,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            bordered
            scroll={{
              x: 700,
            }}
            loading={loading}
          />
          <ToastContainer />
          {/* -------Modal Add Task------- */}
          <Modal
            open={modalAddTask}
            onCancel={() => setModalAddTask(false)}
            footer={[]}
            centered
          >
            <p className="text-3xl font-semibold text-center mt-7 mb-8 text-[#008ECC]">
              {t("add_task")}
            </p>
            <Form
              {...formItemLayout}
              form={formAddTask}
              onFinish={onFinishAddTask}
              className="mx-auto"
              style={{
                width: "100%",
                maxWidth: 700,
              }}
              scrollToFirstError
              dir="ltr"
            >
              {/* <Form.Item
                name="status"
                className="w-full mx-2.5"
                wrapperCol={{ span: 24, offset: 1 }}
              >
                <Radio.Group size="large" className="w-full">
                  <Radio.Button value="pending">
                    <div
                      className="uppercase"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#F7B500",
                          marginRight: 8,
                        }}
                      />
                      pending
                    </div>
                  </Radio.Button>
                  <Radio.Button value="in-progress">
                    <div
                      className="uppercase"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#0091FF",
                          marginRight: 8,
                        }}
                      />
                      IN PROGRESS
                    </div>
                  </Radio.Button>

                  <Radio.Button value="completed">
                    <div
                      className="uppercase"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#B0B0B0",
                          marginRight: 8,
                        }}
                      />
                      completed
                    </div>
                  </Radio.Button>
                </Radio.Group>
              </Form.Item> */}

              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please input your Title!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter a Title"
                  className={`rounded-md border border-gray-300 ${
                    mode === "dark" && "dark-mode"
                  }`}
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input your Description!",
                  },
                ]}
              >
                <Input.TextArea
                  showCount
                  maxLength={150}
                  autoSize={{
                    minRows: 3,
                    maxRows: 6,
                  }}
                  placeholder="Enter a Description"
                />
              </Form.Item>

              <button
                type="submit"
                disabled={loadingAddTask}
                className="text-white w-full mt-1 bg-sky-500 hover:bg-sky-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center disabled:bg-sky-500/50"
              >
                {!loadingAddTask ? t("add_task") : t("loadingUpdate")}
              </button>
            </Form>
          </Modal>
          {/* -------Modal Edit Task------- */}
          <Modal
            open={modalEditTask}
            onCancel={() => {
              setModalEditTask(false);
            }}
            footer={[]}
            centered
          >
            <p className="text-3xl font-semibold text-center mt-7 mb-8 text-[#008ECC]">
              {t("update_task")}
            </p>
            <Form
              {...formItemLayout}
              form={formEditTask}
              onFinish={onFinishEditTask}
              className="mx-auto"
              style={{
                width: "100%",
                maxWidth: 900,
              }}
              scrollToFirstError
              dir="ltr"
            >
              <Form.Item
                name="status"
                className="w-full mx-2.5"
                wrapperCol={{ span: 24, offset: 1 }}
              >
                <Radio.Group size="large" className="w-full">
                  <Radio.Button value="pending">
                    <div
                      className="uppercase"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#F7B500",
                          marginRight: 8,
                        }}
                      />
                      pending
                    </div>
                  </Radio.Button>
                  <Radio.Button value="in-progress">
                    <div
                      className="uppercase"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#0091FF",
                          marginRight: 8,
                        }}
                      />
                      IN PROGRESS
                    </div>
                  </Radio.Button>

                  <Radio.Button value="completed">
                    <div
                      className="uppercase"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#1DCD9F",
                          marginRight: 8,
                        }}
                      />
                      completed
                    </div>
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please input your Title!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter a Title"
                  className={`rounded-md border border-gray-300 ${
                    mode === "dark" && "dark-mode"
                  }`}
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input your Description!",
                  },
                ]}
              >
                <Input.TextArea
                  showCount
                  maxLength={150}
                  autoSize={{
                    minRows: 3,
                    maxRows: 6,
                  }}
                  placeholder="Enter a Description"
                />
              </Form.Item>

              <button
                type="submit"
                disabled={loadingUpdateTask}
                className="text-white w-full mt-1 bg-sky-500 hover:bg-sky-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center  disabled:bg-sky-500/50"
              >
                {!loadingUpdateTask ? t("update_task") : t("loadingUpdate")}
              </button>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default HomePage;
