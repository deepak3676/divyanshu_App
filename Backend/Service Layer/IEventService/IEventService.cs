using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.IEventService
{
    public interface IEventService<T> where T : Event
    {
        IEnumerable<T> AddEvents(IEnumerable<T> newEvents);

        void DeleteEvent(T eventToDelete);
        void UpdateEvent(T updatedEvent);
    }
}