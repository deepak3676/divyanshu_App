import { Component, HostListener, OnInit } from '@angular/core';
import { ProjectDataService } from '../Service/project-data.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import Swal from 'sweetalert2';
@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.css'],
})
export class ProjectReportComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event): void {
    // Handle the popstate event (user clicked back or forward)
    localStorage.clear();
  }

  Projects: any[] = [];
  projectNames: any[] = [];
  months: { name: string; value: number }[] = [
    { name: 'Select Month', value: 0 },
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];
  selectedMonth: { name: string; value: number } = this.months[0];
  selectedProject: string = '';
  filteredProjects: any[] = [];
  checkedProjectIds: number[] = [];
  selectAll: boolean = false;
  tenantName = localStorage.getItem('tenantName');
  constructor(
    private projectData: ProjectDataService
  ) // private toastr: ToastrService,
  // private ngxService: NgxUiLoaderService
  {}

  ngOnInit() {
    this.getAllProjects();
    this.getAllProjectNames();
    console.log(this.tenantName);
  }

  getAllProjects() {
    const tenantName = localStorage.getItem('tenantName');

    // Check if tenantName exists in local storage
    if (tenantName) {
      this.projectData.getAllProjects().subscribe((data) => {
        // Filter projects based on the tenantName
        this.Projects = data.filter(
          (project) => project.tenantName === tenantName
        ) as any[];
        this.updateFilteredProjects();
      });
    } else {
      console.error('Tenant name not found in local storage');
      // Optionally, you might want to handle this case by showing an error message or redirecting the user.
    }
  }

  getProjectById(id: number) {
    this.projectData.getProjectDetailById(id).subscribe((data) => {
      const project = data as any;

      const index = this.filteredProjects.findIndex(
        (p) => p.projectId === project.projectId
      );

      if (index === -1) {
        this.filteredProjects.push(project);
      } else {
        this.filteredProjects[index] = project;
      }
    });
  }

  getAllProjectNames() {
    if (this.tenantName) {
      this.projectData.getProjectNames().subscribe((data) => {
        // Filter project names based on the tenantName
        this.projectNames = (data as any[]).filter(
          (projectName) => projectName.tenantName === this.tenantName
        );
      });
    }
  }

  getProjectByMonth() {
    if (this.tenantName) {
      this.projectData
        .getProjectsByMonth(this.selectedMonth.value)
        .subscribe((data) => {
          // Filter projects based on the tenantName
          this.filteredProjects = (data as any[]).filter(
            (project) => project.tenantName === this.tenantName
          );
        });
    }
  }

  selectProject(project: any) {
    if (project.checked) {
      this.projectData
        .getProjectDetailById(project.projectId)
        .subscribe((data) => {
          const selectedProject = data as any;
          const index = this.filteredProjects.findIndex(
            (p) => p.projectId === selectedProject.projectId
          );

          if (index === -1) {
            this.filteredProjects.push(selectedProject);
            this.checkedProjectIds.push(selectedProject.projectId);
          } else {
            this.filteredProjects[index] = selectedProject;
          }
        });
    } else {
      this.removeUncheckedProject(project.projectId);
    }
  }

  removeUncheckedProject(projectId: number) {
    const index = this.filteredProjects.findIndex(
      (p) => p.projectId === projectId
    );

    if (index !== -1) {
      this.filteredProjects.splice(index, 1);
      this.checkedProjectIds = this.checkedProjectIds.filter(
        (id) => id !== projectId
      );
    }
  }

  selectAllProjects() {
    this.Projects.forEach((project) => {
      project.checked = !project.checked;
    });
    this.checkedProjectIds = this.Projects.filter(
      (project) => project.checked
    ).map((project) => project.projectId);
    this.updateFilteredProjects();
  }

  updateFilteredProjects() {
    this.filteredProjects = this.Projects.filter((project) =>
      this.checkedProjectIds.includes(project.projectId)
    );
  }

  selectMonth(month: { name: string; value: number }) {
    this.selectedMonth = month;
    this.getProjectByMonth();
  }

  exportToCSV() {
    // this.ngxService.start();
    const csvData = this.generateCSVData();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'projects.csv');

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    // this.ngxService.stop();
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Report Downloaded Successfully!',
    //   text: 'Your Report has been downloaded successfully.',
    // });
  }

  generateCSVData() {
    const headers = [
      'Project Id',
      'Project Name',
      'Client',
      'Start Date',
      'End Date',
      'Country',
      'Budget',
      'Status',
    ];
    const csvArray = [headers.join(',')];

    this.filteredProjects.forEach((project) => {
      const row = [
        project.projectId,
        project.projectName,
        project.client,
        project.startDate,
        project.endDate,
        project.country,
        project.budget,
        project.status,
      ];
      csvArray.push(row.join(','));
    });

    return csvArray.join('\n');
  }

  filterProjectsByProject() {
    this.filteredProjects = this.Projects.filter((project) => project.checked);
  }
}
